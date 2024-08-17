const apiUrl = config.apiUrl;

document.addEventListener('DOMContentLoaded', () => {
    const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany'));

    if (!selectedCompany) {
        alert('업체 정보가 없습니다.');
        window.location.href = './main.html';
        return;
    }

    // 업체 정보를 표시할 HTML 요소
    let companyNameElement = $('#company-name');
    let companyEmailElement = $('#company-email');
    let companyLocationElement = $('#company-location');
    let companyCategoryElement = $('#company-category');
    let companyPrElement = $('#company-pr');
    let companyCommentsElement = $('#company-comments');

    // API 호출로 업체 상세 정보 가져오기
    $.ajax({
        url: `${apiUrl}/user/info`,
        method: 'GET',
        data: {
            email: selectedCompany.email
        },
        success: function(response) {
            if (response.ok) {
                const companyDetails = response.data;

                // 받은 데이터를 HTML에 반영
                companyNameElement.text(companyDetails.name);
                companyEmailElement.text(companyDetails.email);
                companyLocationElement.text(companyDetails.loc);
                companyCategoryElement.text(companyDetails.category);
                companyPrElement.text(companyDetails.pr);
                companyCommentsElement.text(companyDetails.comment);
                
            } else {
                alert('업체 정보를 가져오는데 실패했습니다.');
            }
        },
        error: function(error) {
            console.error('업체 정보 불러오는 중 오류 발생:', error);
            alert('업체 정보를 불러오는데 문제가 발생했습니다.');
        }
    });

    // '목록으로' 버튼 클릭 시 이전 페이지로 이동
    document.querySelector('.back-btn').addEventListener('click', () => {
        window.history.back();
    });
});
