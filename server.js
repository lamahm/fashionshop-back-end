require('./config/passportConfig');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const passport = require('passport');

const authRoute = require('./routes/authRoute');
const indexRoute = require('./routes/indexRoute');
const adminRoute = require('./routes/adminRoute');
const configDB = require('./config/secret')

app.use(cors());
app.use(passport.initialize());
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb', extended: true}));

mongoose.set('useCreateIndex', true);
mongoose.connect(configDB.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('db connect')
});

app.use('/api/fashionshop', indexRoute);
app.use('/api/fashionshop', authRoute);
app.use('/api/fashionshop', adminRoute);

app.listen(3000, () => {
    console.log('Server start');
})