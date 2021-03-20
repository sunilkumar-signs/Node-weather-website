const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()

//Define path for express config  
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index', {
        title:'Weather',
        name: 'Sunil kumar A'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Sunil kumar A'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some helpfull text',
        title: 'help',
        name: 'Sunil kumar A'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Enter an valid location'
        })
    } else { 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {    //Object destructuring data from geocode and {} default object
        if (error){
          return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
          if (error){
            return res.send({ error})
          }
          res.send({
            forecast: forecastdata,
            location,        
            address: req.query.address              
        })
        })
      })
    }
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        name:'Sunil kumar A',
        title:'404',
        errorMessage: 'Help not found'
    })
})
app.get('*', (req, res)=>{  // error displaying 
    res.render('404', {
        title:'404',
        name:'Sunil kumar A',
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{   // start up the server
    console.log('the application is up and running on port 3000')
})

