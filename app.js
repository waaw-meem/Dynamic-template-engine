const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');


const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// For HandleBars Template Engine
app.engine('hbs', engine({layoutsDir:'views/layout/', defaultLayout:'main-layout',extname:'hbs'}));
app.set('view engine', 'hbs');

app.set('view engine', 'ejs')

// Using app.set for views-engine and views template (dynamic)
app.set('view engine', 'pug')
app.set('views','views')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
   
    res.status(404).render('404', {pageTitle: 'Page Not Found'});

});

app.listen(3001);
