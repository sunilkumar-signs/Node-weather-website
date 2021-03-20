const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=11ecb5c4db1a70da46f2f1abee1cf5ce&query=' + latitude + ',' + longitude 

    request({ url, json: true }, (error, {body}) => {  // url:url object property shorthand response > {body} destructuring obj
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log(body)
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. And there is 0% chance of rain" )
        }
    })
}

module.exports = forecast
