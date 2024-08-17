const apiUrl = config.apiUrl;

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        //const location = document.getElementById('location').value;
        //const category = document.getElementById('category').value;
        const pr = document.getElementById('pr').value;
        const comments = document.getElementById('comments').value;

        const newCompany = { email, pr, comments };

        // 서버에 업체 등록 요청 보내기
        $.ajax({
            url: `${apiUrl}/partners/affiliate/register`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newCompany),
            success: function(response) {
                if (response.ok) {
                    alert('업체 등록이 완료되었습니다!');
                    
                    // 메인 페이지로 리다이렉트
                    window.location.href = './main.html';
                } else {
                    alert(`업체 등록에 실패했습니다: ${response.msg}`);
                }
            },
            error: function(error) {
                console.error('업체 등록 중 오류가 발생했습니다:', error);
                alert('업체 등록에 실패했습니다.');
            }
        });
    });
});
