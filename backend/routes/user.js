var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 회원가입
router.post('/signup', (req, res, next) => {
    res.status(200).json({
        ok: true,
        message: 'Signup post request success',
    });
});

// 로그인
router.post('/login', (req, res, next) => {
    res.status(200).json({
        ok: true,
        message: 'Login post request success',
    });
});

// 업체 상세보기
router.get('/info', (req, res, next) => {
    res.status(200).json({
        ok: true,
        data: {
            email: '업체이메일',
            name: '업체이름',
            loc: '업체주소',
            category: '업체전화번호',
            pr: '업체소개',
            comment: '업체한줄평',
        },
    });
});

// 매칭을 받고 싶어하는 업체 리스트

// 제휴 신청하기

// 제휴 신청한 리스트 보기

// 나와 매칭을 원하는 업체 리스트

// 신청 업체 수락 및 거절

// 내 업체 등록하기

module.exports = router;
