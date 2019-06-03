//Variable to check if user is signed in as admin
let signedin_admin = 'no';

//Function which is run when the user signs in using Google Sign-in
//THIS IS ONLY NEEDED FOR THE CLOUD DEPLOYED VERSION
/*async function onSignIn(googleUser) {
    signedin_admin = 'no';
    let profile = googleUser.getBasicProfile();
    window.name = profile.getName();
    window.id = profile.getId();
//check if admin by checking if user is on list of admins

    try{
        //let response = await fetch('./admins',
            {
                method: 'GET',
            });
        if(response.ok){
            let body = await response.text();
            let userJSON = JSON.parse(body);
            for (let i in userJSON){
                //if userid is in the list
                if(window.id == i){
                    signedin_admin = 'yes';
                }
            }
        //if response is not ok
        }else{
            throw new Error('Cannot verify users' + response.code);
        }
    } catch (error) {
        //output error using danger alert
        document.getElementById('welcome').innerHTML = '<div class="alert alert-danger" role="alert">Problem Verifying User: ' + error+'</div>';
    }
    document.getElementById('welcome').innerHTML = '<p>Signed in as '+ window.name+'.</p><a href=\'#\' onclick=\'signOut()\'> Sign Out?</a>';
}

//To sign out using Google Sign in
function signOut() {
    signedin_admin = 'no';
    document.getElementById('welcome').innerHTML =  '<p>Sign in with an administrator account to remove and edit posts!</p>';
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
}
*/

//This is added in the local version for testing as an admin user.
signedin_admin = 'yes';
window.name = 'Admin User';
window.id = '109310035031010515399';
document.getElementById('welcome').innerHTML = '<p>Signed in as '+ window.name+'.</p><a href=\'#\' onclick=\'signOut()\'> Sign Out?</a>';


//Prevent form from submitted when enter key is pressed
document.getElementById('get_country').addEventListener('submit', function(event){
    event.preventDefault();
});

//Get list of country when user types in the form
document.getElementById('get_country').addEventListener('input', async function(event){
    event.preventDefault();
    //if user is not signed in as admin - don't show countries/remove anything already displayed
    if (signedin_admin == 'no'){
        document.getElementById('locations0').innerHTML = '';
        document.getElementById('locationserror').innerHTML = '<div class="alert alert-danger" role="alert">Please sign in with an accout that has administrator privileges.</div>';
    //if user is signed in as admin
    }else{
        //remove any preexisting errrors
        document.getElementById('locationserror').innerHTML = '';


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
            document.getElementById('locationserror').innerHTML = '<div class="alert alert-danger" role="alert">No Country Found. Please try another country. If problem persists, please try again later.</div>';
        }
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

    //remove any comments already displayed
    document.getElementById('comment').innerHTML = '';
    //store selected country is country_name variable
    let country_name = document.getElementById('selected').innerText;

    //display relevant information if user is signed in
    if(signedin_admin == 'yes'){
        document.getElementById('commentintro').innerHTML = '<h3>Remove/Edit Posts:</h3><p><b>Press the edit or delete button below the post you want to change!</b></p>';
    }
    if(signedin_admin == 'no'){
        document.getElementById('commentintro').innerHTML = '<h3>Remove/Edit Posts:</h3><p><b>Sign in as admin to remove and edit posts!</b></p>';
    }

    //GET country details
    try{
        //  let response = await fetch('./comments?country_name=' + country_name,
        let response = await fetch('./commentslocal?country_name=' + country_name,
            {
                method: 'GET',
            });

        //scroll to scroll element
        document.getElementById('scroll').scrollIntoView();

        if(response.ok){
            let body = await response.text();
            //if the response is empty, there are no comments
            if (body == 'undefined'){
                document.getElementById('comment').innerHTML += '<p>No comments for this locations</p>';
                document.getElementById('scroll').scrollIntoView();
            }

            else{
                let countryJSON = JSON.parse(body);
                //display each comment along with an edit and delete button
                for (let i in countryJSON){
                    document.getElementById('comment').innerHTML += '<li>' + countryJSON[i]['User'] + ' - '+countryJSON[i]['Comment']+'</li>';
                    document.getElementById('comment').innerHTML += `<button type='button' onclick='editpost("${i}")'>Edit Post</button>`;
                    document.getElementById('comment').innerHTML += `<button type='button' onclick='deletepost("${i}")'>Delete Post</button>`;

                    document.getElementById('comment').innerHTML += '<p></p>';
                }
            }

            document.getElementById('comment').innerHTML += '<hr>';

        //if response is not ok
        } else {
            throw new Error('Problem finding comment ' + response.code);
        }

    //output error
    } catch (error) {
        document.getElementById('postalert').innerHTML = '<div class="alert alert-danger" role="alert">Unable to get comments: '+error+'.</div>';
    }
}

//Runs when delete button is pressed
async function deletepost(comment_id){
    //remove existing errors
    document.getElementById('postalert').innerHTML = '';

    if (signedin_admin == 'yes'){

        document.getElementById('postalert').innerHTML = '<div class="alert alert-info" role="alert">Deleting Post...</div>';
        try{
            //use POST request to delete selected post with comment_id
            //let response = await fetch('./removecomments?comment_id=' +comment_id+'&country_name='+document.getElementById('selected').innerText,
            let response = await fetch('./removecommentslocal?comment_id=' +comment_id+'&country_name='+document.getElementById('selected').innerText,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });

            if(response.ok){
                document.getElementById('postalert').innerHTML = '<div class="alert alert-success" role="alert">Success!</div>';
                //locations() will refresh comments
                locations();

            //if response not ok
            }else{
                throw new Error('problem removing post' + response.code);
            }

        } catch (error) {
            document.getElementById('postalert').innerHTML = '<div class="alert alert-danger" role="alert">Problem Removing Post: '+error+'.</div>';
        }

    //if not signed in as admin
    }else{
        document.getElementById('postalert').innerHTML = '<div class="alert alert-danger" role="alert">Please sign in with an accout that has administrator privileges.</div>';
    }
}

//runs when edit button is pressed
//this appears as an error when using eslint as the button doens't exist at the start of the program
async function editpost(comment_id){// eslint-disable-line
    //remove existing errors
    document.getElementById('postalert').innerHTML = '';
    if (signedin_admin == 'yes'){
        //GET all comment for country
        try{
            //let response = await fetch('./comments?country_name=' + document.getElementById('selected').innerText,
            let response = await fetch('./commentslocal?country_name=' + document.getElementById('selected').innerText,
                {
                    method: 'GET',
                });

            document.getElementById('scroll').scrollIntoView();

            if(response.ok){
                //find comment which the user has selected using the comment_id and display its contents in a text area
                let body = await response.text();
                let countryJSON = JSON.parse(body);
                window.editname = countryJSON[comment_id]['User'];
                document.getElementById('postalert').innerHTML += '<textarea id=\'commentarea\'rows=\'4\' cols=\'60\'>'+countryJSON[comment_id]['Comment']+'</textarea></></br>';
                //runs the post function when pressed
                document.getElementById('postalert').innerHTML += '<button type=\'button\' onclick=\'post("'+comment_id+'")\' id=\'post\'>Post</button><p></p>';

            //if response not ok
            } else {
                throw new Error('Unable to edit comment ' + response.code);
            }

        } catch (error) {
            document.getElementById('postalert').innerHTML = '<div class="alert alert-danger" role="alert">Unable to edit comment: '+error+'.</div>';
        }
    //if user is not signed in as admin
    }else{
        document.getElementById('postalert').innerHTML = '<div class="alert alert-danger" role="alert">Please sign in with an accout that has administrator privileges.</div>';
    }
}

//called when post button is pressed
//this appears as an error when using eslint as the button doens't exist at the start of the program
async function post(comment_id){// eslint-disable-line

    //if no comment has been entered
    if(document.getElementById('commentarea').value == ''){
        document.getElementById('postalert').innerHTML += '<div class="alert alert-warning" role="alert">Please enter a comment.</div>';

    }else{
        //POST the comment
        try{
            //let response = await fetch('./addcomments?selectedcountry='+ document.getElementById('selected').innerText,
            let response = await fetch('./addcommentslocal?selectedcountry='+ document.getElementById('selected').innerText,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'details= {"User":"'+ window.editname +'","Comment":"'+ ((document.getElementById('commentarea').value).replace(/[#!$%^&*;:{}=_`~()'"/]/g,'').replace(/\s{2,}/g,' '))+'"}'
                });

            document.getElementById('scroll').scrollIntoView();

            if(response.ok){
                //delete old comment
                deletepost(comment_id);
                document.getElementById('postalert').innerHTML = '<div class="alert alert-success" role="alert">Successfully Edited Post!</div>';

            //if response not ok
            } else {
                throw new Error('Unable to edit comment ' + response.code);
            }

        } catch (error) {
            document.getElementById('postalert').innerHTML = '<div class="alert alert-danger" role="alert">Problem Editing Post: '+error+'.</div>';
        }
    }
}

//When view users button is pressed
document.getElementById('viewusers').addEventListener('click', async function(event){
    event.preventDefault();
    //if signed in as admin
    if(signedin_admin == 'yes'){
        document.getElementById('userserror').innerHTML = '';
        //GET list of users
        try{
            //let response = await fetch('./userlist',
            let response = await fetch('./userlistlocal',
                {
                    method: 'GET',
                });

            if (response.ok){
                let body = await response.text();
                //if there are no users display error
                if (body == 'undefined'){
                    document.getElementById('allusers').innerHTML += '<p>No users found</p>';

                }else{
                    let userJSON = JSON.parse(body);
                    //display all uesrs and their email address in a list
                    for (let i in userJSON){
                        document.getElementById('allusers').innerHTML += '<li>' + userJSON[i]['Name'] + ' - '+userJSON[i]['Email']+'</li><p></p>';
                    }

                    document.getElementById('scrollusers').scrollIntoView();
                }

            //if response not ok
            }else{
                throw new Error('Problem getting list of users' + response.code);
            }
        } catch (error) {
            document.getElementById('userserror').innerHTML = '<div class="alert alert-danger" role="alert">Unable to Get List of Users: '+error+'</div>';
        }
    }
    //if not signed in as admin
    if(signedin_admin == 'no'){
        document.getElementById('userserror').innerHTML = '<div class="alert alert-danger" role="alert">Please sign in with an accout that has administrator privileges.</div>';
    }
});
