$(document).ready(function() {
    // user 변수를 전역에서 정의
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
    renderMatchedCompanies();
    renderIncomingRequests(user);  // 여기서 user 변수가 존재해야 함
});

let matchedCompanies = [
    { name: '업체1', location: '서울', category: 'IT' },
];

function renderMatchedCompanies() {
    const $matchedCompaniesList = $('#matched-companies-list');
    $matchedCompaniesList.empty(); // 기존 리스트 초기화

    matchedCompanies.forEach(company => {
        const $row = $('<tr>');

        $row.html(`
            <td>${company.name}</td>
            <td>${company.location}</td>
            <td>${company.category}</td>
            <td><button class="delete-btn">등록 삭제하기</button></td>
        `);

        $row.find('.delete-btn').on('click', () => {
            alert(`${company.name}의 매칭이 삭제되었습니다.`);
            // 매칭 삭제 로직 추가
            matchedCompanies = matchedCompanies.filter(c => c.name !== company.name);
            renderMatchedCompanies(); // 삭제 후 리스트 새로고침
        });

        $matchedCompaniesList.append($row);
    });
}

// 나와 매칭하고 싶은 업체들
function renderIncomingRequests(user) {
    const $incomingRequestsList = $('#incoming-requests-list');
    $incomingRequestsList.empty(); // 기존 리스트 초기화

    // 서버에서 나와 매칭을 원하는 업체 리스트 가져오기
    $.ajax({
        url: 'http://localhost:3000/partners/list',
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
        url: 'http://localhost:3000/partners/response',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            receive: receiveEmail,
            transmit: transmitEmail,
            accept: isAccepted
        }),
        success: function(response) {
            if (response.ok) {
                if (isAccepted && company) {
                    alert(`${company.name}의 요청을 수락했습니다.`);
                    matchedCompanies.push({
                        name: company.name,
                        location: company.loc,
                        category: company.category
                    });
                    renderMatchedCompanies(); // 성공 시 리스트 새로고침
                } else {
                    alert(`${company.name}의 요청을 거절했습니다.`);
                }
                renderIncomingRequests(user); // 성공 시 리스트 새로고침
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