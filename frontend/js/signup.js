// document.addEventListener('DOMContentLoaded', () => {
//     const signupForm = document.getElementById('signup-form');
    
//     if (signupForm) {
//         signupForm.addEventListener('submit', async (event) => {
//             event.preventDefault();

//             const email = document.getElementById('email').value;
//             const password = document.getElementById('password').value;
//             const name = document.getElementById('name').value;
//             const company = document.getElementById('company').value;
//             const location = document.getElementById('location').value;
//             const category = document.getElementById('category').value;

//             // 백엔드 서버로 POST 요청 보내기 (localhost:3000)
//             axios.post('http://localhost:3000/user/signup', { email, password, name, company, location, category })
//                 .then(response => {
//                     if (response.data.ok) {
//                         alert('회원가입 성공!');
//                         window.location.href = '../pages/login.html'; // 회원가입 성공 시 로그인 페이지로 이동
//                     } else {
//                         alert(response.data.msg);
//                     }
//                 })
//                 .catch(error => {
//                     console.error('회원가입 요청 실패:', error);
//                     alert('회원가입 실패. 다시 시도해주세요.');
//                 });
//             });
//     }
// });


$(document).ready(function() {
    const $signupForm = $('#signup-form');

    if ($signupForm.length) {
        $signupForm.on('submit', function(event) {
            event.preventDefault();

            const email = $('#email').val();
            const password = $('#password').val();
            const name = $('#name').val();
            const company = $('#company').val();
            const location = $('#location').val();
            const category = $('#category').val();

            // 백엔드 서버로 POST 요청 보내기 (localhost:3000)
            $.ajax({
                url: 'http://localhost:3000/user/signup',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ email, password, name, company, location, category }),
                success: function(response) {
                    if (response.ok) {
                        alert('회원가입 성공!');
                        window.location.href = '../pages/login.html'; // 회원가입 성공 시 로그인 페이지로 이동
                    } else {
                        alert(response.msg);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('회원가입 요청 실패:', error);
                    alert('회원가입 실패. 다시 시도해주세요.');
                }
            });
        });
    }
});
