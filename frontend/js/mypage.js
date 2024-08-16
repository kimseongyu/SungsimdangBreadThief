document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('로그인이 필요합니다.');
        window.location.href = './login.html';
        return;
    }

    // 로그아웃 처리
    document.querySelector('.logout-btn').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = './login.html';
    });

    renderMatchedCompanies();
    renderIncomingRequests();
});

function renderMatchedCompanies() {
    const matchedCompaniesList = document.getElementById('matched-companies-list');
    matchedCompaniesList.innerHTML = ''; // 기존 리스트 초기화

    // 더미 데이터 - 현재 매칭된 상인 리스트 (여기서는 localStorage 또는 mock API로부터 가져올 수 있음)
    let matchedCompanies = [
        { name: '업체 A', location: '서울', category: '음식' },
        { name: '업체 B', location: '부산', category: '패션' }
    ];

    matchedCompanies.forEach(company => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${company.name}</td>
            <td>${company.location}</td>
            <td>${company.category}</td>
            <td><button class="delete-btn">등록 삭제하기</button></td>
        `;

        row.querySelector('.delete-btn').addEventListener('click', () => {
            alert(`${company.name}의 매칭이 삭제되었습니다.`);
            // 매칭 삭제 로직 추가
        });

        matchedCompaniesList.appendChild(row);
    });
}

function renderIncomingRequests() {
    const incomingRequestsList = document.getElementById('incoming-requests-list');
    incomingRequestsList.innerHTML = ''; // 기존 리스트 초기화

    // 더미 데이터 - 나에게 온 매칭 요청 리스트 (여기서는 localStorage 또는 mock API로부터 가져올 수 있음)
    let incomingRequests = [
        { name: '업체 C', location: '대구', category: '테크' }
    ];

    incomingRequests.forEach(company => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${company.name}</td>
            <td>${company.location}</td>
            <td>${company.category}</td>
            <td>
                <button class="accept-btn">수락 완료됨</button>
                <button class="delete-btn">등록 삭제하기</button>
            </td>
        `;

        row.querySelector('.accept-btn').addEventListener('click', () => {
            alert(`${company.name}의 매칭을 수락했습니다.`);
            // 매칭 수락 로직 추가
        });

        row.querySelector('.delete-btn').addEventListener('click', () => {
            alert(`${company.name}의 매칭 요청이 삭제되었습니다.`);
            // 매칭 요청 삭제 로직 추가
        });

        incomingRequestsList.appendChild(row);
    });
}
