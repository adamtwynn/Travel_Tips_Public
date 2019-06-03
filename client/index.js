//Variable to check if user is signed in
let signedin = 'no';

//Function which is run when the user signs in using Google Sign-in
//THIS IS ONLY NEEDED FOR THE CLOUD DEPLOYED VERSION
/*async function onSignIn(googleUser) {
    signedin = 'yes';
    //Get User information
    let profile = googleUser.getBasicProfile();
    window.name = profile.getName();
    window.id = profile.getId();
    window.email = profile.getEmail();
    //Display Welcome on HTML page
    document.getElementById('welcome').innerHTML = '<p>Signed in as '+ window.name+'.</p><a href=\'#\' onclick=\'signOut()\'> Sign Out?</a>';*/

//This is added in the local version for testing as an admin user.
async function signin(){
    signedin = 'yes';
    window.name = 'Admin User';
    window.id = '109310035031010515399';
    window.email = 'admin@test.com';
    document.getElementById('welcome').innerHTML = '<p>Signed in as '+ window.name+'.</p>';
    //Add User to Database using a POST method
    try{
        // let response = await fetch('./user?userid=' + window.id,
        let response = await fetch('./userlocal?userid=' + window.id,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'details= {"Email":"'+ window.email+'","Name":"'+ window.name+'"}'

            });
        //If the response is not ok throw an error
        if(!response.ok){
            throw new Error('problem adding user to database' + response.code);
        }
    } catch (error) {
        //If there is an errror, display it on the HTML page using the warning alert
        document.getElementById('welcome').innerHTML = '<div class="alert alert-warning" role="alert">Problem Adding User to Database: ' + error+'. You may still continue to use this app with full functionality.</div>';
    }
}
signin();

//To sign out using Google Sign in
//THIS IS ONLY NEEDED FOR THE CLOUD DEPLOYED VERSION
/*async function signOut() {
    signedin = 'no';
    document.getElementById('welcome').innerHTML =  '<p>Sign in to post comments!</p>';
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
}*/

//Prevent form from submitted when enter key is pressed
document.getElementById('get_country').addEventListener('submit', function(event){
    event.preventDefault();
});

//Get list of country when user types in the form
document.getElementById('get_country').addEventListener('input', async function(event){
    event.preventDefault();

    try{
        //let variable country_name equal the value in the text box
        let country_name = document.getElementById('country_name').value;
        document.getElementById('locationserror').innerHTML = '<div class="alert alert-info" role="alert">Searching...</div>';

        //If there are already values due to previous search results, erase them
        for(let i=0;i<8; i++){
            document.getElementById('locations'+i).innerHTML = '';
        }

        //If the user hasn't entered anything
        if (country_name == ''){
            document.getElementById('locationserror').innerHTML = '<div class="alert alert-warning" role="alert">Please enter a country in the box above.</div>';
            return;
        }

        //GET method
        let response = await fetch('./country?country_name=' + country_name,
            {
                method: 'GET',
            });

        if(response.ok){
            let body = await response.text();
            let countryJSON = JSON.parse(body);

            //If there are already values due to previous search results, erase them
            for(let i=0;i<8; i++){
                document.getElementById('locations'+i).innerHTML = '';
            }

            //Remove any old errors
            document.getElementById('locationserror').innerHTML = '';

            //Iterate through each item in countryJSON (at most 8) and display each one as a list group item
            for(let i=0;(i<countryJSON.length)&&(i<8); i++){
                document.getElementById('locations'+i).innerHTML += `<button type='button' id=countrylist${i} class="list-group-item list-group-item-action">${countryJSON[i].name}</button>`;
            }

        //If response not ok, through error
        } else {
            throw new Error('Problem finding country ' + response.code);
        }

    } catch (error) {
        //Output error as a danger alert in the locationserror div
        document.getElementById('locationserror').innerHTML = '<div class="alert alert-warning" role="alert">No Country Found. Please try another country. If problem persists, please try again later.</div>';
    }
});

//Add event listeners to each list group item.
//If 'location0' is pressed
document.getElementById('locations0').addEventListener('click', function(event){
    event.preventDefault();
    //Display the chosen country in the 'selected' div
    document.getElementById('selected').innerHTML = `<h2>${document.getElementById('countrylist0').innerText}</h2>`;
    //Call the locations() function
    locations();
});

document.getElementById('locations1').addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('selected').innerHTML = `<h2>${document.getElementById('countrylist1').innerText}</h2>`;
    locations();
});

document.getElementById('locations2').addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('selected').innerHTML = `<h2>${document.getElementById('countrylist2').innerText}</h2>`;
    locations();
});

document.getElementById('locations3').addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('selected').innerHTML = `<h2>${document.getElementById('countrylist3').innerText}</h2>`;
    locations();
});

document.getElementById('locations4').addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('selected').innerHTML = `<h2>${document.getElementById('countrylist4').innerText}</h2>`;
    locations();
});

document.getElementById('locations5').addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('selected').innerHTML = `<h2>${document.getElementById('countrylist5').innerText}</h2>`;
    locations();
});

document.getElementById('locations6').addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('selected').innerHTML = `<h2>${document.getElementById('countrylist6').innerText}</h2>`;
    locations();
});

document.getElementById('locations7').addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('selected').innerHTML = `<h2>${document.getElementById('countrylist7').innerText}</h2>`;
    locations();
});

async function locations(){

    //store selected country is country_name variable
    let country_name = document.getElementById('selected').innerText;

    //GET country details
    try{
        let response = await fetch('./country?country_name=' + country_name,
            {
                method: 'GET',
            });

        if(response.ok){
            let body = await response.text();
            let countryJSON = JSON.parse(body);
            //Display country details in relevant divs
            document.getElementById('details').innerHTML = '<h3>Details:</h3>';
            document.getElementById('details').innerHTML += 'Continent: '+`<span> ${countryJSON[0].region} </span>`;
            document.getElementById('details').innerHTML += '<br />Region: '+`<span> ${countryJSON[0].subregion} </span>`;
            document.getElementById('details').innerHTML += '<br />Population: '+`<span> ${countryJSON[0].population} </span>`;
            document.getElementById('details').innerHTML += '<br />Capital City: '+`<span> ${countryJSON[0].capital} </span>`;
            document.getElementById('details').innerHTML += '<br /><br />Flag: <img src=\''+`${countryJSON[0].flag}`+'\' height=\'100\'>';

        //if response is not ok
        } else {
            throw new Error('Problem finding country ' + response.code);
        }

    } catch (error) {
        //display error as a danger alert in details div
        document.getElementById('details').innerHTML = `<div class="alert alert-danger" role="alert">Details Not Found: ${error}</div>`;
    }

    //scroll to scroll element
    document.getElementById('scroll').scrollIntoView();

    //Check if user is signed in and display correct instructions
    if(signedin == 'yes'){
        document.getElementById('comment').innerHTML = '<h3>Tips & Comments:</h3><br /><p><b>Add your own below!</b></p>';
    }
    if(signedin == 'no'){
        document.getElementById('comment').innerHTML = '<h3>Tips & Comments:</h3><br /><p><b>Sign in above to add your own!</b></p>';
    }

    //Create textarea called commentarea where user can enter comments
    document.getElementById('comment').innerHTML += '<textarea id=\'commentarea\'rows=\'4\' cols=\'60\'></textarea></></br>';
    //Once button is pressed go to post() function
    document.getElementById('comment').innerHTML += '<button type=\'button\' onclick=\'post()\' id=\'post\'>Comment</button><p></p>';
    //Create empty div called postalert where posting errors can be displayed
    document.getElementById('comment').innerHTML += '<div id=\'postalert\'></div>';

    //GET existing comments
    try{
        //let response = await fetch('./comments?country_name=' + country_name,
        let response = await fetch('./commentslocal?country_name=' + country_name,
            {
                method: 'GET',
            });

        if(response.ok){
            let body = await response.text();
            //If there are no comments for selected country
            if (body == 'undefined'){
                document.getElementById('comment').innerHTML += '<p>No comments for this location</p>';

            }else{
                let countryJSON = JSON.parse(body);
                for (let i in countryJSON){
                    //display each comment as a list
                    document.getElementById('comment').innerHTML += '<li>' + countryJSON[i]['User'] + ' - '+countryJSON[i]['Comment']+'</li><p></p>';
                }
            }

        //if response not ok
        } else {
            throw new Error('Problem finding comment ' + response.code);
        }

    } catch (error) {
        document.getElementById('postalert').innerHTML = '<div class="alert alert-danger" role="alert">Unable to find comments. Please try again later: '+error+'.</div>';
    }
}

//called when button is pressed
//this appears as an error when using eslint as the button doens't exist at the start of the program
async function post() {// eslint-disable-line
    document.getElementById('postalert').innerHTML = '<div class="alert alert-info" role="alert">Posting...</div>';
    //If user is not signed in, don't post
    if(signedin == 'no'){
        document.getElementById('postalert').innerHTML = '<div class="alert alert-danger" role="alert">You are not signed in so the comment was not posted! Please sign in at the top of the page.</div>';
    }
    //if comment is blank, don't post
    else if(document.getElementById('commentarea').value == ''){
        document.getElementById('postalert').innerHTML = '<div class="alert alert-warning" role="alert">Please enter a comment.</div>';
    }
    //if user is signed in, attempt to POST
    else if(signedin == 'yes'){
        try{
            //let response = await fetch('./addcomments?selectedcountry='+ document.getElementById('selected').innerText,
            let response = await fetch('./addcommentslocal?selectedcountry='+ document.getElementById('selected').innerText,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    //remove punctuation which could cause issues when storing comments in the database
                    body: 'details= {"User":"'+ window.name+'","Comment":"'+ ((document.getElementById('commentarea').value).replace(/[#!$%^&*;:{}=_`~()'"/]/g,'').replace(/\s{2,}/g,' '))+'"}'
                });

            if(response.ok){
                //Refresh comments
                //Check again if user is signed in
                if(signedin == 'yes'){
                    document.getElementById('comment').innerHTML = '<h3>Tips & Comments:</h3><br /><p><b>Add your own below!</b></p>';
                }
                if(signedin == 'no'){
                    document.getElementById('comment').innerHTML = '<h3>Tips & Comments:</h3><br /><p><b>Sign in above to add your own!</b></p>';
                }

                //Create textarea called commentarea where user can enter comments
                document.getElementById('comment').innerHTML += '<textarea id=\'commentarea\'rows=\'4\' cols=\'60\'></textarea></></br>';
                //Once button is pressed go to post() function
                document.getElementById('comment').innerHTML += '<button type=\'button\' onclick=\'post()\' id=\'post\'>Comment</button><p></p>';
                //Create empty div called postalert where posting errors can be displayed
                document.getElementById('comment').innerHTML += '<div id=\'postalert\'></div>';
                //GET comments
                try{
                    let country_name = document.getElementById('selected').innerText;
                    //let response = await fetch('./comments?country_name=' + country_name,
                    let response = await fetch('./commentslocal?country_name=' + country_name,
                        {
                            method: 'GET',
                        });

                    if(response.ok){
                        document.getElementById('postalert').innerHTML = '<div class="alert alert-success" role="alert">Your comment was successfully posted!</div>';
                        let body = await response.text();
                        //If there are no Comments
                        if (body == 'undefined'){
                            document.getElementById('comment').innerHTML += '<p>No comments for this location</p>';

                        }else{
                            let countryJSON = JSON.parse(body);
                            for (let i in countryJSON){
                                document.getElementById('comment').innerHTML += '<li>' + countryJSON[i]['User'] + ' - '+countryJSON[i]['Comment']+'</li><p></p>';
                            }
                        }
                    //if response not ok for GETting comments
                    } else {
                        throw new Error('Problem finding comment ' + response.code);
                    }
                } catch (error) {
                    document.getElementById('postalert').innerHTML += '<div class="alert alert-danger" role="alert">Unable to refresh posts: '+error+'.</div>';
                }
            //if response not ok for POSTING comments
            } else{
                throw new Error('Problem Posting Content' + response.code);
            }
        } catch (error) {
            document.getElementById('postalert').innerHTML = '<div class="alert alert-danger" role="alert">Unable to Post Comments - '+error+'</div>';
        }
    }
}
