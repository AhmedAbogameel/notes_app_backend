require('dotenv').config();
const express = require('express');

const app = express();

const port = process.env.PORT;

// ========== Setup Middlewares ========= //
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const rateLimit = require('express-rate-limit');
const path = require('path');

app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'uploads')));

// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    'Too many requests, please try again after an hour',
});

app.use('/api', limiter);

// ========== Launch Database ========== //

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST)
    .then(result => {
        app.listen(port, () => {
            var domain = process.env.DOMAIN
            if (!domain) {
                domain = `http://localhost:${port}`
            }
            console.log(`App Listening at ${domain}`);
        });
    }).catch(err => {
        console.log(err);
    });

// ========== Routes ========== //

const routes = require('./routes/routes')
routes(app)

app.all('*', (req, res, next) => {
    return res.status(404).json({'message': "Not found"});
});