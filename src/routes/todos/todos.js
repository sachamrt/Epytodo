module.exports = function (app) {

app.get('/todos', (req, res) => {
    const sql = "SELECT * FROM todo";

    req.app.locals.connection.query(sql, (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Error selecting' });

        res.json(result);
    });
});

app.get('/todos/:id', (req, res) => {
    const sql = "SELECT * FROM todo WHERE id = ?";

    req.app.locals.connection.query(sql, [req.params.id], (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Error selecting' });

        res.json(result);
    });
});

app.post('/todos', (req, res) => {
    const sql = "INSERT INTO todo SET ?";
    const { title, description, due_time, user_id, status } = req.body;

    const values = { title, description, due_time, user_id, status };
    req.app.locals.connection.query(sql, values, (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Error inserting' });
        res.json(values);
    });
});

app.put('/todos/:id', (req, res) => {
    const sql = "UPDATE todo SET ? WHERE id = ?";
    const { title, description, due_time, user_id, status } = req.body;

    const values = { title, description, due_time, user_id, status };
    req.app.locals.connection.query(sql, [values, req.params.id], (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Error updating' });
        res.json(values);
    });
});

app.delete('/todos/:id', (req, res) => {
    const sql = "DELETE FROM todo WHERE id = ?";

    req.app.locals.connection.query(sql, [req.params.id], (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Error deleting' });

        res.json({ msg: `Successfully deleted record number: ${req.params.id}` });
    });
});

}