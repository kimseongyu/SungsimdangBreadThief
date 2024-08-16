document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const guestActions = document.getElementById('guest-actions');
    const userActions = document.getElementById('user-actions');
    const userGreeting = document.getElementById('user-greeting');
    const registerBtn = document.querySelector('.register-btn');

    if (user) {
        guestActions.style.display = 'none';
        userActions.style.display = 'flex';
        userGreeting.textContent = `환영합니다, ${user.email}님`;

        registerBtn.addEventListener('click', () => {
            window.location.href = './registration-page.html';
        });

        document.querySelector('.logout-btn').addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = './main.html';
        });

        document.querySelector('.mypage-btn').addEventListener('click', () => {
            window.location.href = './mypage.html';
        });
    } else {
        guestActions.style.display = 'flex';
        userActions.style.display = 'none';

        registerBtn.addEventListener('click', () => {
            alert('로그인이 필요합니다.');
            window.location.href = './login.html';
        });

        document.querySelector('.login-btn').addEventListener('click', () => {
            window.location.href = './login.html';
        });

        document.querySelector('.signup-btn').addEventListener('click', () => {
            window.location.href = './sign-up.html';
        });
    }

    renderCompanies();
});

function renderCompanies() {
    // 서버로부터 제휴 등록된 업체 리스트를 가져옴
    axios.get('http://localhost:3000/partners/affiliate/list')
        .then(response => {
            const companyList = response.data.data;
            const companyListElement = document.getElementById('company-list');
            
            // 기존 리스트 초기화
            companyListElement.innerHTML = '';

            // 업체 리스트를 테이블에 추가
            companyList.forEach(company => {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = company.name;
                row.appendChild(nameCell);

                const locCell = document.createElement('td');
                locCell.textContent = company.loc;
                row.appendChild(locCell);

                const categoryCell = document.createElement('td');
                categoryCell.textContent = company.category;
                row.appendChild(categoryCell);

                const actionCell = document.createElement('td');
                
                // 제휴 신청 버튼
                const applyButton = document.createElement('button');
                applyButton.textContent = '제휴 신청하기';
                applyButton.classList.add('apply-btn');
                applyButton.addEventListener('click', () => {
                    // 제휴 신청 페이지로 이동
                    window.location.href = './partner-register.html';
                });
                actionCell.appendChild(applyButton);
                
                // 등록 삭제 버튼
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '등록 삭제하기';
                deleteButton.classList.add('delete-btn');
                deleteButton.addEventListener('click', () => {
                    const confirmDelete = confirm("정말로 등록을 삭제하시겠습니까?");
                    if (confirmDelete) {
                        // 서버에 삭제 요청을 보낼 수 있음
                        // 여기서는 예시로 삭제 작업 후 메인 페이지로 리다이렉트
                        axios.post('http://localhost:3000/partners/delete', { email: company.email })
                            .then(() => {
                                alert('등록이 삭제되었습니다.');
                                renderCompanies(); // 테이블 업데이트
                            })
                            .catch(error => {
                                console.error('등록 삭제 중 오류가 발생했습니다.', error);
                                alert('등록 삭제에 실패했습니다.');
                            });
                    }
                });
                actionCell.appendChild(deleteButton);

                row.appendChild(actionCell);

                companyListElement.appendChild(row);
            });
        })
        .catch(error => {
            console.error('업체 리스트를 불러오는데 실패했습니다.', error);
            alert('업체 리스트를 불러오는데 문제가 발생했습니다.');
        });
}



// "제휴 신청하기" 버튼 클릭 시 partner-register.html로 이동
document.querySelectorAll('.apply-btn').forEach(button => {
    button.addEventListener('click', () => {
        redirectTo('../pages/partner-register.html');
    });
});

// "등록 삭제하기" 버튼 클릭 시 경고 메시지를 띄우고, 사용자가 확인하면 해당 페이지로 이동
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => {
        const confirmDelete = confirm("정말로 등록을 삭제하시겠습니까?");
        if (confirmDelete) {
            redirectTo('../pages/main.html');  // 삭제 후 메인 페이지로 리다이렉트
        }
    });
});

// 로그인 버튼 클릭 시 login.html로 이동
document.querySelector('.login-btn').addEventListener('click', () => {
    redirectTo('../pages/login.html');
});

// 회원 가입 버튼 클릭 시 signup.html로 이동
document.querySelector('.signup-btn').addEventListener('click', () => {
    redirectTo('../pages/sign-up.html');
});

// "나도 제휴 등록하기" 버튼 클릭 시 partner-register.html로 이동
document.querySelector('.register-btn').addEventListener('click', () => {
    redirectTo('../pages/registration-page.html');
});
