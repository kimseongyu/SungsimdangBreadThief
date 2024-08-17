const apiUrl = config.apiUrl;

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
                url: `${apiUrl}/user/signup`,
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
