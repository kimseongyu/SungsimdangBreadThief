var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var config = require('../config/dbconfig');
const connection = mysql.createConnection(config);

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 회원가입
router.post('/signup', (req, res, next) => {
    connection.query(
        `INSERT INTO users VALUES (${req.body.email}, ${req.body.pw}, ${req.body.name}, ${req.body.loc}, ${req.body.category})`,
        (err, rows) => {
            if (err) res.send(400).json({ ok: false, message: err });
            else res.send(200).json({ ok: true, message: 'Signup post request success' });
        },
    );
});

// 로그인
router.post('/login', (req, res, next) => {
    connection.query(
        `SELECT COUNT(*) FROM users WHERE email = ${req.body.email} AND pw = ${req.body.pw}`,
        (err, rows) => {
            if (err) res.send(400).json({ ok: false, message: err });
            else if (rows[0] === 0) res.send(400).json({ ok: false, message: 'Login failed' });
            else res.send(200).json({ ok: true, message: 'Login success' });
        },
    );
});

module.exports = router;
