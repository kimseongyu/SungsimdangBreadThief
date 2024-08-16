// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;

//     // Express.js 서버로 POST 요청
//     axios.post('http://localhost:3000/user/login', { email, password })
//         .then(response => {
//             if (response.data.ok) {
//                 alert('로그인 성공!');
//                 // 로그인 성공 시 사용자 정보를 localStorage에 저장
//                 localStorage.setItem('user', JSON.stringify({ email }));
//                 window.location.href = '../pages/main.html'; // 로그인 성공 시 메인 페이지로 이동
//             } else {
//                 alert(response.data.msg);
//             }
//         })
//         .catch(error => {
//             console.error('로그인 요청 실패:', error);
//             alert('로그인 실패. 다시 시도해주세요.');
//         });
// });
$(document).ready(function() {
    $('#login-form').on('submit', function(event) {
        event.preventDefault();

        const email = $('#login-email').val();
        const password = $('#login-password').val();

        // Express.js 서버로 POST 요청
        $.ajax({
            url: 'http://localhost:3000/user/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function(response) {
                if (response.ok) {
                    alert('로그인 성공!');
                    // 로그인 성공 시 사용자 정보를 localStorage에 저장
                    localStorage.setItem('user', JSON.stringify({ email }));
                    window.location.href = '../pages/main.html'; // 로그인 성공 시 메인 페이지로 이동
                } else {
                    alert(response.msg);
                }
            },
            error: function(xhr, status, error) {
                console.error('로그인 요청 실패:', error);
                alert('로그인 실패. 다시 시도해주세요.');
            }
        });
    });
});
