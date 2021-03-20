const request = require('request')

const geocode = (address, callback) =>{

const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?access_token=pk.eyJ1Ijoic3VuaWxrdW1hcmEyMSIsImEiOiJja202cXc0OTgwcXNvMnd1aWUxZzBteTlkIn0.ILS7DQ4upDjI6WLSxEfF2w&limit=1'

request({url, json: true}, (error, {body})=>{ // url:url object property shorthand response > {body} destructuring obj
    if(error){
        callback('unable to connect to network services', undefined)
    } else if(body.features.length === 0){
        callback('Unable to find the location. Try another search', undefined)
    } else {
        callback(undefined,{
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    }
})
}

module.exports = geocode