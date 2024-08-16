document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const location = document.getElementById('location').value;
        const category = document.getElementById('category').value;
        const pr = document.getElementById('pr').value;
        const comments = document.getElementById('comments').value;

        const newCompany = { email, location, category, pr, comments };

        // 기존 회사 목록 가져오기
        let companies = JSON.parse(localStorage.getItem('companies')) || [];
        
        // 새로운 회사 추가
        companies.push(newCompany);

        // localStorage에 저장
        localStorage.setItem('companies', JSON.stringify(companies));
        
        alert('업체 등록이 완료되었습니다!');
        
        // 메인 페이지로 리다이렉트
        window.location.href = './main.html';
    });
});
