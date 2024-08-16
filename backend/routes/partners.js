var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 매칭을 받고 싶어하는 업체 리스트
router.get('/affiliate/list', (req, res, next) => {
    connection.query(
        `SELECT u.email, u.name, u.loc, u.category FROM users u WHERE u.email IN (SELECT email FROM affiliate)`,
        (err, rows) => {
            if (err) res.send(400).json({ ok: false, data: [] });
            else res.send(200).json({ ok: true, data: rows });
        },
    );
});

// 매칭을 받고 싶어하는 업체 상세보기
router.get('/affiliate/info', (req, res, next) => {
    connection.query(
        `SELECT 
    u.email,
    u.name,
    u.loc,
    u.category,
    a.pr,
    a.comment
FROM 
    users u
LEFT JOIN 
    affiliate a ON u.email = a.email
WHERE 
    u.email = ${req.params.email};
`,
        (err, rows) => {
            if (err) res.send(400).json({ ok: false, data: {} });
            else
                res.send(200).json({
                    ok: true,
                    data: {
                        email: rows[0].email,
                        name: rows[0].name,
                        loc: rows[0].loc,
                        category: rows[0].category,
                        pr: rows[0].pr,
                        comment: rows[0].comment,
                    },
                });
        },
    );
});

// 제휴 신청하기
router.post('/apply', (req, res, next) => {
    connection.query(
        `insert into partners(receive, transmit, pr, comment) partners values (${req.body.receive}, ${req.body.transmit}, ${req.body.pr}, ${req.body.comment})
`,
        (err, rows) => {
            if (err) res.send(400).json({ ok: false, message: err });
            else res.send(200).json({ ok: true, message: 'Apply post request success' });
        },
    );
});

// 제휴 신청한 리스트 보기
router.get('/apply/list', (req, res, next) => {
    connection.query(
        `select u.email as "email",  u.name as "name", u.loc as "loc", u.category as "category"
from partners as p join users as u
where p.transmit = ${req.params.email} and p.receive = u.email`,
        (err, rows) => {
            if (err) res.send(400).json({ ok: false, data: [] });
            else res.send(200).json({ ok: true, data: rows });
        },
    );
});

// 나와 매칭을 원하는 업체 리스트
router.get('/list', (req, res, next) => {
    connection.query(
        `SELECT 
    u.email,
    u.name,
    u.loc,
    u.category
FROM 
    partners p
JOIN 
    users u ON p.transmit = u.email
WHERE 
    p.receive = ${req.params.email};
`,
        (err, rows) => {
            if (err) res.send(400).json({ ok: false, data: [] });
            else res.send(200).json({ ok: true, data: rows });
        },
    );
});

// 나와 매칭을 원하는 업체 상세보기
router.get('/info', (req, res, next) => {
    connection.query(
        `select u.email as "email",  u.name as "name", u.loc as "loc", u.category as "category", p.pr as "pr", p.comment as "comment"
from user as u join partners as p
where p.transmit = ${req.params.transmit} and p.receive = ${req.params.receive}`,
        (err, rows) => {
            if (err) res.send(400).json({ ok: false, data: {} });
            else
                res.send(200).json({
                    ok: true,
                    data: {
                        email: rows[0].email,
                        name: rows[0].name,
                        loc: rows[0].loc,
                        category: rows[0].category,
                        pr: rows[0].pr,
                        comment: rows[0].comment,
                    },
                });
        },
    );
});

// 신청 업체 수락 및 거절
router.post('/response', (req, res, next) => {
    connection.query(
        `DELETE FROM partners
WHERE receive = ${req.body.receive} AND transmit = ${req.body.transmit};
`,
        (err, rows) => {
            if (err) res.send(400).json({ ok: false, message: err });
            else res.send(200).json({ ok: true, message: 'Response post request success' });
        },
    );
});

// 내 업체 등록하기
router.post('/affiliate/register', (req, res, next) => {
    connection.query(
        `INSERT INTO affiliate (email, pr, comment) VALUES (${req.body.email}, ${req.body.pr}, ${req.body.comment}) 
        ON DUPLICATE KEY UPDATE pr = VALUES(pr), comment = VALUES(comment);`,
        (err, rows) => {
            if (err) res.send(400).json({ ok: false, message: err });
            else res.send(200).json({ ok: true, message: 'Affiliate register post request success' });
        },
    );
});

module.exports = router;
