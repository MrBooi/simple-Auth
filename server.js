const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const app = express();

let PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));

app.use(flash());

//database connection 
const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
if (process.env.DATABASE_URL) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/shoe_api'

const pool = new Pool({
    connectionString,
    ssl: useSSL
});



app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    let greeting = 'Hello';
    if (req.session.username) {
        greeting += (", " + req.session.username)
    }
    res.send(greeting);
});

app.get('/login:username', (req, res) => {
    const loginUsername = req.query.username;
    console.log(loginUsername);
    if (loginUsername && !req.session.username) {
        req.session.username = loginUsername;
    }

    res.redirect('/');
})

app.get('/logout', (req, res) => {
    delete req.session.username;
    res.redirect('/');
});

app.listen(PORT, () => console.log('App starting on port', PORT));