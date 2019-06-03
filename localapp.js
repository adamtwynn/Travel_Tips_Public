//THIS IS THE SERVER-SIDE CODE FOR THE LOCAL TESTING VERSION

const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cors = require('cors');
const accents = require('remove-accents');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(express.static('client'));

//GET from country API
app.get('/country', async function (req, resp){
    try{
        let country = req.query.country_name;
        let response = await fetch('https://restcountries.eu/rest/v2/name/' + accents.remove(country));
        if(response.ok){
            let body = await response.text();
            body = JSON.parse(body);
            resp.send(body);
        } else {
            if (response.code == undefined){
                let body = '';
                resp.send(body);
            }

            else{
                throw new Error('Problem getting data ' + response.code);
            }
        }
    } catch (error) {
        console.error(error);
    }

});


//THE FOLLOWING FUNCTIONS ARE FOR LOCAL TESTING ONLY
let local_database = require('./local_database.json');
//GET from local database - Comments
app.get('/commentslocal', function (req, resp){
    let country = req.query.country_name;
    let response = local_database['Comments'][country];
    if (typeof response == 'undefined'){
        let body = 'undefined';
        resp.send(body);
    }else{
        resp.send(response);
    }
});

//Delete from local database - Comments
app.post('/removecommentslocal', function (req, resp){
    let country = req.query.country_name;
    let comment_id = req.query.comment_id;
    delete local_database['Comments'][country][comment_id];
    resp.send('Success');
});

//GET from local database - Users
app.get('/userlistlocal', function (req, resp){
    let response = local_database['Users'];
    if (typeof response == 'undefined'){
        let body = 'undefined';
        resp.send(body);
    }else{
        resp.send(response);
    }
});


//POST to local database - Users
app.post('/userlocal', function (req, resp){
    let userid = req.query.userid;
    local_database['Users'][userid] = JSON.parse(req.body.details);
    resp.send('Success');
});

//POST comments to local database
app.post('/addcommentslocal', function (req, resp){
    let country = req.query.selectedcountry;
    if (typeof local_database['Comments'][country] == 'undefined'){
        local_database['Comments'][country] = JSON.parse('{"1":'+ req.body.details+'}');
    } else{
        local_database['Comments'][country][Object.keys(local_database['Comments'][country]).length+1] = JSON.parse(req.body.details);
    }
    resp.send('Success');
});



//if address can't be found show 404 page
app.use(function (req, res) {
    res.status(404).sendFile('client/404.html' , { root : './'});
});
module.exports = app;
