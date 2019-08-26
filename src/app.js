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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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


/* DASHBOARD ROUTES */
app.get('/', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
    res.render('generic', getBundle('main'))
});
app.get('/lots', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
    res.render('generic', getBundle('main'))
});
app.get('/houses', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
    res.render('generic', getBundle('main'))
});
app.get('/departments', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
    res.render('generic', getBundle('main'))
});
app.get('/historics', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
    res.render('generic', getBundle('main'))
});
app.get('/historic_reports', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
    res.render('generic', getBundle('main'))
});
app.get('/admin/users', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
    res.render('generic', getBundle('main'))
});
app.get('/detail', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
    res.render('generic', getBundle('main'))
});
app.get('/towerdetail', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
  res.render('generic', getBundle('main'))
});

// /* -------------------------------- */
// /* HISTORICS ROUTES */
// app.get('/historics', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
//   res.render('generic', getBundle('historics'));
// });
// /* -------------------------------- */
// /* USERS ROUTES */
// app.get('/admin/users', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
//   res.render('generic', getBundle('users'))
// });
// /* HOUSES & LOTS */
// app.get('/admin/lots', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
//   res.render('generic', getBundle('lots'))
// });
// app.get('/admin/houses', cookieParser(), auth.express.authenticate('jwt', { failureRedirect: '/login' }), (req, res) => {
//   res.render('generic', getBundle('houses'))
// });


/* -------------------------------- */
/* AUTHENTICATION ROUTES */
app.get('/login', cookieParser(), authRedirect(), (req, res) => {
    var bundle = pugUrls.chunks.login[0].publicPath;
    res.render('login', { bundlePath: bundle });
});
/* VERIFICATION ROUTES */
app.get('/validate', async(req, res) => {
    if (req.query.token != undefined) {
        await app.service('authManagement')
            .create({
                action: 'verifySignupLong',
                value: req.query.token
            }).then(r => {
                // console.log('r');
                if (r && r.isVerified) {
                    res.redirect('/login');
                }
            });
    } else {
        res.send('Bad request');
    }
    /* 'Just in case' */
    res.send({ error: 'this should redirect to /games ...' });
});

app.get('/logout', cookieParser(), (req, res) => {
    res.clearCookie('feathers-jwt');
    res.redirect('/login');
});

/* -------------------------------- */
/*            TEST ROUTES           */
app.get('/tests', (req, res) => {
        const x = pugjs.renderFile(app.get('views') + '/email.pug', { link: 'google.com' })
        res.send(x);
    })
    // app.get('/tests', (req, res) => {
    //   var server = email.server.connect({
    //     user: "d_sanchez@ar3d.net",
    //     password: "Ar345678",
    //     host: "smtp.ar3d.net",
    //     ssl: false
    //   });

//   server.send({
//     text: "i hope this works",
//     from: "Daniel 'Trapo' Sánchez <d_sanchez@ar3d.net>",
//     to: "Axel 'Trapo' Daniel Luna <d_luna@ar3d.net>",
//     // cc: "else <else@your-email.com>",
//     subject: "testing emailjs"
//   }, function (err, message) {
//     res.send('success')
//     console.log(err || message);
//   });
// })
// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));


app.hooks(appHooks);

module.exports = app;
