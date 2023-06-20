const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports = function (app) {
app.post('/register', (req, res) => {
    const { email, name, firstname, password } = req.body;

    if (!email || !name || !firstname || !password)
        return res.status(400).json({ msg: 'Missing parameters' });

    const exist = "SELECT * FROM user WHERE email = ?";
    req.app.locals.connection.query(exist, [email], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ msg: 'Error selecting' });
        }
        if (result.length !== 0)
            return res.status(400).json({ msg: 'Account already exists' });
    });

    bcrypt.hash(password, 10, function (err, hash) {
        if (err)
            return res.status(500).json({ msg: 'Error hashing' });
        const sql = "INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)";
        const values = [email, name, firstname, hash];
        req.app.locals.connection.query(sql, values, (err, result) => {
            if (err)
                return res.status(500).json({ msg: 'Error inserting' });
            const accessToken = jwt.sign({ email, name, firstname }, process.env.SECRET);
            res.json({ token: accessToken });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ msg: 'Missing parameters' });

    const sql = "SELECT password FROM user WHERE email = ?";
    req.app.locals.connection.query(sql, [email], (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Error selecting' });
        if (result.length === 0)
            return res.status(400).json({ msg: 'Invalid Credentials' });
        const storedPassword = result[0].password;
        bcrypt.compare(password, storedPassword, function (err, result) {
            if (err)
                return res.status(500).json({ msg: 'Error comparing' });
            if (result) {
                const accessToken = jwt.sign({ email }, process.env.SECRET);
                res.json({ token: accessToken });
            } else {
                return res.status(400).json({ msg: 'Bad password' });
            }
        });
    });
});

}