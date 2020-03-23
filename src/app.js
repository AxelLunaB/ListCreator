const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');
const cookieParser = require('cookie-parser');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const authRedirect = require('./middleware/auth-redirect');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const sequelize = require('./sequelize');

const authentication = require('./authentication');

const auth = require('@feathersjs/authentication').default;

const app = express(feathers());

var email = require("emailjs");

const pugjs = require('pug');


// Load app configuration
app.configure(configuration());

const pugUrls = require(`../${app.get('frontend')}`);

const getBundle = function(bundle) {
        var bundle = pugUrls.chunks[bundle][0].publicPath;
        return { bundlePath: bundle };
    }
    // Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(favicon(path.join(app.get('public'), 'fav.png')));
// Host the public folder
app.use('/static', express.static(app.get('public')));
// ROUTES

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);



app.get('/', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
    res.render('generic', getBundle('main'))
});


app.get('/login', cookieParser(), authRedirect(), (req, res) => {
    var bundle = pugUrls.chunks.login[0].publicPath;
    res.render('login', { bundlePath: bundle });
});

app.get('/logout', cookieParser(), (req, res) => {
    res.clearCookie('feathers-jwt');
    res.redirect('/login');
});

app.use(express.notFound());
app.use(express.errorHandler({ logger }));


app.hooks(appHooks);

module.exports = app;
