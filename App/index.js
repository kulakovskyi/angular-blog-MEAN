const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {mongoose} = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');
const dashboard = require('./routes/dashboard');
const session = require('express-session');
const Post = require('./models/post')

const app = express();

const port = 3000;

app.use(session({
    secret : config.secret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}))

mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
    console.log('Success connection to the database')
});

mongoose.connection.on('error', (err) => {
    console.log('Error connection to the database' + err)
});

app.listen(port, () => {
    console.log('Server start port: ' + port)
});

app.get('/', (req, res) => {
    Post.find().then(posts => res.json(posts))
});

app.get('/post/:id', (req, res) => {
    const url = req.url.split('/')
    id = url[2]
    Post.findById(id).then(posts => res.json(posts))
});

app.delete('/post/:id', (req, res) => {
    const url = req.url.split('/')
    id = url[2]
    Post.deleteOne({_id: id}).then(() => res.json({success: 'Post deleted'}))
});



app.use('/account', account)

app.use('/dashboard', dashboard)
