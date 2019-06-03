//THIS IS THE SERVER-SIDE CODE FOR THE CLOUD DEPLOYED VERSION AND IS USED BY JEST FOR TESTING

const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cors = require('cors');
const accents = require('remove-accents');
const bodyParser = require('body-parser');
const request = require('request-promise');

//the following functions (up to line 40) are needed to create a access token which I can't share
/*var {google} = require('googleapis');

// Load the service account key JSON file.
var serviceAccount = require('./prog-term-2-1554120616714-firebase-adminsdk-2qg6f-b1bbb03f0b.json');

// Define the required scopes.
var scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/firebase.database'
];

// Authenticate a JWT client with the service account.
var jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    scopes
);

// Use the JWT client to generate an access token.
jwtClient.authorize(function(error, tokens) {
    if (error) {
        console.error('Error making request to generate access token:', error);
    } else if (tokens.access_token === null) {
        console.error('Provided service account does not have permission to generate access tokens');
    } else {
        global.accessToken = tokens.access_token;
    }
});*/

global.accessToken = undefined;

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
            }else{
                throw new Error('Problem getting data ' + response.code);
            }
        }
    } catch (error) {
        console.error(error);
    }

});

//GET from external database - Comments - USED IN THE CLOUD DEPLOYED VERSION ONLY
app.get('/comments', async function (req, resp){
    try{
        let country = req.query.country_name;
        let response = await fetch('https://prog-term-2-1554120616714.firebaseio.com/Comments/' + country+'.json');
        if(response.ok){
            let body = await response.text();
            body = JSON.parse(body);
            resp.send(body);
        } else {
            if (response.code == undefined){
                let body = '';
                resp.send(body);
            }else{
                throw new Error('Problem getting data ' + response.code);
            }
        }
    } catch (error) {
        console.error(error);
    }

});

//DELETE from external database - Comments - USED IN THE CLOUD DEPLOYED VERSION ONLY
app.post('/removecomments', async function (req, resp){
    let country = req.query.country_name;
    let comment_id = req.query.comment_id;
    let tempaccesstoken = global.accessToken;
    if(global.accessToken == undefined){
        tempaccesstoken = req.query.accessToken;
    }
    try{
        const response = await request.delete({
            url:'https://prog-term-2-1554120616714.firebaseio.com/Comments/' + country+'/'+comment_id+'.json?access_token='+tempaccesstoken,
        }, function(httpResponse){
            if(req.query.accessToken == undefined & global.accessToken == undefined){
                resp.sendStatus(403);
            }else{
                resp.send(httpResponse);
            }
        });
        return Promise.resolve(response.id == 5);
    } catch (error) {
        Promise.reject(error);
    }
});

//GET from external database - Users - USED IN THE CLOUD DEPLOYED VERSION ONLY
app.get('/userlist', async function (req, resp){
    try{
        let response = await fetch('https://prog-term-2-1554120616714.firebaseio.com/Users.json');
        if(response.ok){
            let body = await response.text();
            body = JSON.parse(body);
            resp.send(body);
        } else {
            if (response.code == undefined){
                let body = '';
                resp.send(body);
            }else{
                throw new Error('Problem getting data ' + response.code);
            }
        }
    } catch (error) {
        console.error(error);
    }

});
//GET from external database - Admins - USED IN THE CLOUD DEPLOYED VERSION ONLY
app.get('/admins', async function (req, resp){
    try{
        let response = await fetch('https://prog-term-2-1554120616714.firebaseio.com/Admins.json');
        if(response.ok){
            let body = await response.text();
            body = JSON.parse(body);
            resp.send(body);
        } else {
            if (response.code == undefined){
                let body = '';
                resp.send(body);
            }else{
                throw new Error('Problem getting data ' + response.code);
            }
        }
    } catch (error) {
        console.error(error);
    }

});

//POST to external database - Users - USED IN THE CLOUD DEPLOYED VERSION ONLY
app.post('/user', async function (req, resp){
    let userid = req.query.userid;
    let tempaccesstoken = global.accessToken;
    if(global.accessToken == undefined){
        tempaccesstoken = req.query.accessToken;
    }
    try{
        const response = await request.put({
            url:'https://prog-term-2-1554120616714.firebaseio.com/Users/'+userid+'.json?access_token='+tempaccesstoken,
            form: req.body.details
        }, function(httpResponse){
            if (req.query.accessToken == undefined & global.accessToken == undefined){
                resp.sendStatus(403);
            }else{
                resp.send(httpResponse);
            }

        });
        return Promise.resolve(response.id == 5);
    } catch (error) {
        Promise.reject(error);

    }
});

//POST comments to external database - USED IN THE CLOUD DEPLOYED VERSION ONLY
app.post('/addcomments', async function (req, resp){
    let country = req.query.selectedcountry;
    let tempaccesstoken = global.accessToken;
    if(global.accessToken == undefined){
        tempaccesstoken = req.query.accessToken;
    }
    try{
        const response = await request.post({
            url:'https://prog-term-2-1554120616714.firebaseio.com/Comments/' + country+'.json?access_token='+tempaccesstoken,
            form: req.body.details
        }, function(httpResponse){
            if(req.query.accessToken == undefined & global.accessToken == undefined){
                resp.sendStatus(403);
            }else{

                resp.send(httpResponse);
            }
        });
        return Promise.resolve(response.id == 5);
    } catch (error) {
        Promise.reject(error);
    }
});

//if address can't be found show 404 page
app.use(function (req, res) {
    res.status(404).sendFile('client/404.html' , { root : './'});
});
module.exports = app;
