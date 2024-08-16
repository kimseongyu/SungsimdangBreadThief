var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 매칭을 받고 싶어하는 업체 리스트
router.get('/affiliate/list', (req, res, next) => {
    res.status(200).json({
        ok: true,
        data: [
            {
                email: '매칭을 받고 싶어하는 업체이메일',
                name: '업체이름',
                loc: '업체주소',
                category: '업체전화번호',
            },
        ],
    });
});

// 제휴 신청하기
router.post('/apply', (req, res, next) => {
    res.status(200).json({
        ok: true,
        msg: '제휴 신청이 완료되었습니다.',
    });
});

// 제휴 신청한 리스트 보기
router.get('/apply/list', (req, res, next) => {
    res.status(200).json({
        ok: true,
        data: [
            {
                email: '제휴 신청한 업체이메일',
                name: '업체이름',
                loc: '업체주소',
                category: '업체전화번호',
            },
        ],
    });
});

// 나와 매칭을 원하는 업체 리스트
router.get('/list', (req, res, next) => {
    res.status(200).json({
        ok: true,
        data: [
            {
                email: '나와 매칭을 원하는 업체이메일',
                name: '업체이름',
                loc: '업체주소',
                category: '업체전화번호',
            },
        ],
    });
});

// 신청 업체 수락 및 거절
router.post('/response', (req, res, next) => {
    res.status(200).json({
        ok: true,
        msg: '신청 업체 수락 및 거절이 완료되었습니다.',
    });
});

// 내 업체 등록하기
router.post('/affiliate/register', (req, res, next) => {
    res.status(200).json({
        ok: true,
        msg: '내 업체 등록이 완료되었습니다.',
    });
});

module.exports = router;
