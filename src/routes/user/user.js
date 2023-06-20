var bcrypt = require('bcryptjs');

module.exports = function (app) {
app.get('/user', (req, res) => {
    const sql = "SELECT * FROM user";

    req.app.locals.connection.query(sql, (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Error selecting' });

        res.json(result);
    });
});

app.get('/user/todos', (req, res) => {
    const sql = "SELECT * FROM todo";

    req.app.locals.connection.query(sql, [req.user.id], (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Error selecting' });
        
        res.json(result);
    });
});

app.get('/users/:id' || '/users/:email', (req, res) => {
    let sql = "";

    if (!(isNaN(req.params.id)))
        sql = "SELECT * FROM user WHERE id = ?";
    else
        sql = "SELECT * FROM user WHERE email = ?";
    
    req.app.locals.connection.query(sql, [req.params.id || req.params.email], (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Error selecting' });

        res.json(result);
    });
});

app.put('/users/:id', (req, res) => {
    const sql = "UPDATE user SET ? WHERE id = ?";
    const ret = "SELECT * FROM user WHERE id = ?";
    const { email, name, firstname, password } = req.body;

    bcrypt.hash(password, 10, function (err, hash) {
        if (err)
            return res.status(500).json({ msg: 'Error hashing' });

        const values = {email,  name, firstname, password: hash};
        req.app.locals.connection.query(sql, [values, req.params.id], (err, result) => {
            if (err) {
                return res.status(500).json({ msg: 'Error updating' });
            }
        });
    });
    req.app.locals.connection.query(ret, req.params.id, (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Error selecting' });

        res.json(result);
    });
});

app.delete('/users/:id', (req, res) => {
    const sql = "DELETE FROM user WHERE id = ?";

    req.app.locals.connection.query(sql, [req.params.id], (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Error deleting' });

        res.json({ msg: `Successfully deleted record number: ${req.params.id}` });
    });
});
}