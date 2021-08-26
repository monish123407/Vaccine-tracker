const express = require('express');
const router = require('./src/routes/index');
var expressLayouts = require('express-ejs-layouts');
const app = express();


app.use(express.static(__dirname+'/src/assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout',__dirname+'/src/views/layouts/layout');
app.set('views', './src/views');

app.use('/', router);

app.listen(3000, async() =>{
    
    console.log('Server started at 3000!!');
});