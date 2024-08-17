const apiUrl = config.apiUrl;

$(document).ready(function() {
    const user = JSON.parse(localStorage.getItem('user')); 

    // 만약 user 정보가 없으면 로그인 페이지로 리디렉션
    if (!user) {
        alert('로그인이 필요합니다.');
        window.location.href = './login.html';
        return;
    }

    // 로그아웃 처리
    $('.logout-btn').on('click', () => {
        localStorage.removeItem('user');
        window.location.href = './login.html';
    });

    // 초기 렌더링 함수 호출
    renderAppliedCompanies(user);  // 내가 제휴 신청한 리스트 보기
    renderIncomingRequests(user);  // 나에게 요청한 업체 리스트 보기
});


let matchedCompanies = [
    { name: '업체1', location: '서울', category: 'IT' },
];

// 내가 신청한 제휴 리스트 보기
function renderAppliedCompanies(user) {
    const $appliedCompaniesList = $('#applied-companies-list');
    $appliedCompaniesList.empty(); // 기존 리스트 초기화

    // 서버에서 내가 신청한 제휴 리스트 가져오기
    $.ajax({
        url: `${apiUrl}/partners/apply/list`,
        type: 'GET',
        contentType: 'application/json',
        data: { email: user.email },  // 자신의 이메일을 사용하여 신청한 리스트 가져오기
        success: function(response) {
            if (response.ok) {
                const appliedCompanies = response.data;

                appliedCompanies.forEach(company => {
                    const $row = $('<tr>');

                    $row.html(`
                        <td>${company.name}</td>
                        <td>${company.email}</td>
                        <td>${company.location}</td>
                        <td>${company.category}</td>
                    `);
                    $appliedCompaniesList.append($row);
                });
            } else {
                alert('데이터를 가져오지 못했습니다.');
            }
        },
        error: function(xhr, status, error) {
            console.error('리스트 요청 실패:', error);
            alert('리스트를 가져오는 데 실패했습니다. 다시 시도해주세요.');
        }
    });
}

// 나와 매칭하고 싶은 업체들
function renderIncomingRequests(user) {
    const $incomingRequestsList = $('#incoming-requests-list');
    $incomingRequestsList.empty(); // 기존 리스트 초기화

    // 서버에서 나와 매칭을 원하는 업체 리스트 가져오기
    $.ajax({
        url: `${apiUrl}/partners/list`,
        type: 'GET',
        contentType: 'application/json',
        data: { email: user.email, keyword: '' }, 
        success: function(response) {
            if (response.ok) {
                const incomingRequests = response.data;

                incomingRequests.forEach(company => {
                    const $row = $('<tr>');

                    $row.html(`
                        <td>${company.name}</td>
                        <td>${company.loc}</td>
                        <td>${company.category}</td>
                        <td>
                            <button class="accept-btn">요청 수락</button>
                            <button class="delete-btn">요청 거절</button>
                        </td>
                    `);

                    $row.find('.accept-btn').on('click', () => {
                        handleRequestResponse(user.email, company.email, true, company);
                    });

                    $row.find('.delete-btn').on('click', () => {
                        handleRequestResponse(user.email, company.email, false);
                    });

                    $incomingRequestsList.append($row);
                });
            } else {
                alert('데이터를 가져오지 못했습니다.');
            }
        },
        error: function(xhr, status, error) {
            console.error('리스트 요청 실패:', error);
            alert('리스트를 가져오는 데 실패했습니다. 다시 시도해주세요.');
        }
    });
}

function handleRequestResponse(receiveEmail, transmitEmail, isAccepted, company = null) {
    $.ajax({
        url: `${apiUrl}/partners/response`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            receive: receiveEmail,
            transmit: transmitEmail,
            accept: isAccepted
        }),
        success: function(response) {
            // 응답의 데이터가 유효한지 확인
            if (response.ok) {
                if (isAccepted && company && company.name) {
                    // company 객체가 유효하고, name 속성이 있을 때만 접근
                    alert(`${company.name}의 요청을 수락했습니다.`);
                    renderIncomingRequests({ email: receiveEmail }); // 성공 시 리스트 새로고침
                } else if (!isAccepted && company && company.name) {
                    alert(`${company.name}의 요청을 거절했습니다.`);
                } else {
                    alert('요청 처리 중 문제가 발생했습니다.');
                }
            } else {
                alert(response.msg);
            }
        },
        error: function(xhr, status, error) {
            console.error('요청 처리 실패:', error);
            alert('요청 처리에 실패했습니다. 다시 시도해주세요.');
        }
    });
}



function redirectTo(url) {
    window.location.href = url;
}

// 예시: 홈 버튼 클릭 시 메인 페이지로 이동
document.querySelector('.home-btn').addEventListener('click', () => {
    redirectTo('../pages/main.html');
});