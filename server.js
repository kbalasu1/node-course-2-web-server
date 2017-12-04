const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();  
})




app.use((req, res, next) => {
    var now  = new Date().toString();
    var logText = `${now} : ${req.method} ${req.path}` 
    console.log(logText);
    fs.appendFile('server.log',logText + '\n', (err) => {
        if(err) {
            console.log('unable to append to server.log');
        }
    })
    next();
});
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname+'/public'));
app.set('view engine','hbs');
app.get('/', (req, res) => {
    console.log('Hello Express');
    /*res.send({
        name: 'Andrew',
        likes: ['Biking', 'Cities']
    });*/
    res.render('home.hbs', {
        pageTitle : 'About Page',
        welcomeMessage : 'Hello Andrew'
    })
    
});

app.get('/about', (req,res) => {
    // res.send('About Page')
    res.render('about.hbs', {
        pageTitle : 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    });
})

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});