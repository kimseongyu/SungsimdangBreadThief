document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const guestActions = $('#guest-actions');
    const userActions = $('#user-actions');
    const userGreeting = $('#user-greeting');
    const registerBtn = $('.register-btn');

    if (user) {
        guestActions.hide();
        userActions.show();
        userGreeting.text(`환영합니다, ${user.email}님`);

        registerBtn.on('click', () => {
            window.location.href = './registration-page.html';
        });

        $('.logout-btn').on('click', () => {
            localStorage.removeItem('user');
            window.location.href = './main.html';
        });

        $('.mypage-btn').on('click', () => {
            window.location.href = './mypage.html';
        });
    } else {
        guestActions.show();
        userActions.hide();

        registerBtn.on('click', () => {
            alert('로그인이 필요합니다.');
            window.location.href = './login.html';
        });

        $('.login-btn').on('click', () => {
            window.location.href = './login.html';
        });

        $('.signup-btn').on('click', () => {
            window.location.href = './sign-up.html';
        });
    }

    renderCompanies();
});

function renderCompanies() {
    // 서버로부터 제휴 등록된 업체 리스트를 가져옴 (AJAX 호출)
    $.ajax({
        url: 'http://localhost:3000/partners/affiliate/list',
        method: 'GET',
        success: function(response) {
            const companyList = response.data;
            const companyListElement = $('#company-list');

            // 기존 리스트 초기화
            companyListElement.empty();

            // 테이블 헤더 추가
            //companyListElement.append('<tr><th>업체명</th><th>위치</th><th>카테고리</th><th>작업</th></tr>');

            // 업체 리스트를 테이블에 추가
            companyList.forEach(company => {
                const row = $('<tr>');
                row.append(`<td>${company.name}</td>`);
                row.append(`<td>${company.loc}</td>`);
                row.append(`<td>${company.category}</td>`);

                const actionCell = $('<td>');

                // 제휴 신청 버튼
                const applyButton = $('<button>').text('제휴 신청하기').addClass('apply-btn');
                applyButton.on('click', () => {
                    if (user) {
                        openApplyModal(company); // 로그인 상태일 때 팝업 열기
                    } else {
                        alert('로그인이 필요합니다.');
                    }
                });
                actionCell.append(applyButton);

                // 등록 삭제 버튼
                const deleteButton = $('<button>').text('등록 삭제하기').addClass('delete-btn');
                deleteButton.on('click', () => {
                    if (user) {
                        const confirmDelete = confirm("정말로 등록을 삭제하시겠습니까?");
                        if (confirmDelete) {
                            deleteCompany(company.email);
                        }
                    } else {
                        alert('로그인이 필요합니다.');
                    }
                });
                actionCell.append(deleteButton);

                row.append(actionCell);
                companyListElement.append(row);
            });
        },
        error: function(error) {
            console.error('업체 리스트를 불러오는데 실패했습니다.', error);
            alert('업체 리스트를 불러오는데 문제가 발생했습니다.');
        }
    });
}

function deleteCompany(email) {
    $.ajax({
        url: 'http://localhost:3000/partners/delete',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email }),
        success: function() {
            alert('등록이 삭제되었습니다.');
            renderCompanies(); // 테이블 업데이트
        },
        error: function(error) {
            console.error('등록 삭제 중 오류가 발생했습니다.', error);
            alert('등록 삭제에 실패했습니다.');
        }
    });
}

function openApplyModal(company) {
    const modal = $('#applyModal');
    const form = $('#applyForm');

    // 모달 열기
    modal.show();

    // 로그인된 유저의 이메일 가져오기
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('로그인이 필요합니다.');
        modal.hide();
        return;
    }

    // 폼 제출 처리
    form.off('submit').on('submit', function(event) {
        event.preventDefault(); // 폼 기본 동작 막기
        const prMessage = $('#pr').val(); // PR 메시지 필드
        const commentMessage = $('#comment').val(); // 한 줄 평 필드

        // AJAX 요청으로 제휴 신청 보내기
        $.ajax({
            url: 'http://localhost:3000/partners/apply',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                transmit: user.email,        // 로그인된 유저 이메일
                receive: company.email,      // 매칭받고 싶은 업체의 이메일
                pr: prMessage,               // PR 메시지
                comment: commentMessage      // 한 줄 평
            }),
            success: function(response) {
                if (response.ok) {
                    alert('제휴 신청이 완료되었습니다.');
                } else {
                    alert('제휴 신청에 실패했습니다: ' + response.msg);
                }
                modal.hide(); // 모달 닫기
            },
            error: function(error) {
                console.error('제휴 신청 중 오류가 발생했습니다.', error);
                alert('제휴 신청에 실패했습니다.');
                modal.hide();
            }
        });
    });

    // 모달 닫기 버튼
    $('.close-btn').on('click', () => {
        modal.hide();
    });
}

// 모달 외부를 클릭해도 모달 닫기
$(window).on('click', function(event) {
    const modal = $('#applyModal');
    if (event.target === modal[0]) {
        modal.hide();
    }
});


// 버튼 이벤트 핸들러
$('.login-btn').on('click', () => {
    window.location.href = './login.html';
});

$('.signup-btn').on('click', () => {
    window.location.href = './sign-up.html';
});

$('.register-btn').on('click', () => {
    window.location.href = './registration-page.html';
});
