require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000;
const db = require('./queries');
const path = require('path');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
})

app.get('/db', db.getTest);
app.get('/table/users/', db.createUsersTable);
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.get('/users/funny/:id', db.getUserByIdFunny)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})