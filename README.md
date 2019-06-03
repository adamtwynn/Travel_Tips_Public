# Travel Tips Documentation

## Website Documentation

### Versions
There are two versions of the website;


The Cloud Deployed Version can be found at https://prog-term-2-1554120616714.firebaseapp.com/. This version features authentication for POST requests and you can sign in using your Google Account to test the 'User' section of the website. You won't be able to use the admin functions in this version. I use an external firebase database in this version. The server side code for this version is in **app.js** which I have submitted for Jest testing and to show how I have done POST requests with authentication.

The local version can be started using `npm start`. I have removed authentication and the user is always signed in as an admin so the admin functionality can be tested. As I can't share the access token for the firebase database, this version uses a local JSON file to store the data called **local_database.json**  and the server side code is **localapp.js**.

You can test the website using `npm test`. This runs eslint as the pretest and Jest as the main test. Jest tests the functions inside of app.js.
### User
#### Sign in using your Google account
In order to post tips/comments, you will need to be signed in to your Google Account (You may still view comments without signing in).

To sign in, press the white Google Sign In button at the top of the page. This will redirect you to the Google sign in page where you will enter your username and password. Once returning to the Travel Tips webpage, if sign in was successful, you will see your username below the sign in button.

Press the sign out text below this to sign out of the website.
#### Search for Country
To search for a country, start typing the name of the country in the text box labelled "Country Name".

As you start to type, you will see the top 8 search results appear below. If the country you search for can't be found, you will see the following message: 'No Country Found. Please try another country.' Please refine or change your search if you cannot find the country you are searching for.

Once you can see your chosen country, press the country to select it and you will see details and comments (if they exist) for that country.

#### View Country Details and Comments
The page is now split into 2 columns. The left column displays the details for the country your have chosen including the continent it is located on, region,  population, capital city and flag.

The right side display tips and comments left by users. If you are signed in, you may add your own comments.
#### Add Your Own Comments

If you are signed in using your Google Account, you will be able to add your own comments and tips for any country. Once you have followed the above instructions to select a country, you can enter your comment in the text area on the right side of the screen. Once you have written your comment, press the comment button and if its was successfully posted, you will see your comment in the list below.

### Admin
#### Sign in using your Google account
In order to remove or edit tips/comments and view all users, you will need to be signed in to your Google Account which has administrator privileges.

To sign in, press the white Google Sign In button at the top of the page. This will redirect you to the Google sign in page where you will enter your username and password. Once returning to the Travel Tips webpage, if sign in was successful, you will see your username below the sign in button.

Press the sign out text below this to sign out of the website.

If you are not signed into an admistrator account, when your try to interact with the page, you will see an error saying "Please sign in with an accout that has administrator privileges.".
#### View all Users
The admin page is split into two sections; 'Remove/Edit Posts' and 'View all Users'. The 'View all Users' section is located towards the bottom of the page.

Press the 'View Users' button to generate a list of all users that have been signed into the website along with their email address.
#### Search for Country
To search for a country, start typing the name of the country in the text box labelled "Country Name".

As you start to type, you will see the top 8 search results appear below. If the country you search for can't be found, you will see the following message: 'No Country Found. Please try another country.' Please refine or change your search if you cannot find the country you are searching for.

Once you can see your chosen country, press the country to select it and you will see comments (if they exist) for that country along with delete and edit buttons.
#### Remove and Edit Posts

After following the above instructions making sure that you are signed in to your Google Account with administrator privileges, you will be able to edit or delete posts by pressing the correct button beneath each post.

Pressing the 'Delete Post' button will remove the post from the database. If it is successful, you will see a message and the post will no longer show up in the list.

Press the 'Edit Post' button will display a text area above the comments where you can edit the comment. Press the 'Post' button to post the edited version of the comment. If it is successful, you will see a message and the edited post will show up in the list.

## API Documentation
#### GET /country
Returns a list of comments along with details such as capital city, region, population, timezones, currency, languages and flags. (Uses data from restcountries.eu)
#### Resource URL
`https://prog-term-2-1554120616714.firebaseapp.com/country`
#### Resource Information
* Resource format - JSON
* Requires authentication? - No
* Rate limited? - No
#### Parameters
* country_name - Required - The name or part of the name of the country you want data for.
#### Example Request
`GET https://prog-term-2-1554120616714.firebaseapp.com/country?country_name=United%20Kingdom`
#### Example Response
`[{"name":"United Kingdom of Great Britain and Northern Ireland","topLevelDomain":[".uk"],"alpha2Code":"GB","alpha3Code":"GBR","callingCodes":["44"],"capital":"London","altSpellings":["GB","UK","Great Britain"],"region":"Europe","subregion":"Northern Europe","population":65110000,"latlng":[54.0,-2.0],"demonym":"British","area":242900.0,"gini":34.0,"timezones":["UTC-08:00","UTC-05:00","UTC-04:00","UTC-03:00","UTC-02:00","UTC","UTC+01:00","UTC+02:00","UTC+06:00"],"borders":["IRL"],"nativeName":"United Kingdom","numericCode":"826","currencies":[{"code":"GBP","name":"British pound","symbol":"£"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"}],"translations":{"de":"Vereinigtes Königreich","es":"Reino Unido","fr":"Royaume-Uni","ja":"イギリス","it":"Regno Unito","br":"Reino Unido","pt":"Reino Unido","nl":"Verenigd Koninkrijk","hr":"Ujedinjeno Kraljevstvo","fa":"بریتانیای کبیر و ایرلند شمالی"},"flag":"https://restcountries.eu/data/gbr.svg","regionalBlocs":[{"acronym":"EU","name":"European Union","otherAcronyms":[],"otherNames":[]}],"cioc":"GBR"}]`

### GET /comments
Returns a list of comments for the country that the user specifies for.
#### Resource URL
`https://prog-term-2-1554120616714.firebaseapp.com/comments`
#### Resource Information
* Resource format - JSON
* Requires authentication? - No
* Rate limited? - No
#### Parameters
* country_name - Required - The name of the country you want to get comments for.
#### Example Request
`GET https://prog-term-2-1554120616714.firebaseapp.com/comments?country_name=Japan `
#### Example Response
`{"-LcuDlMmmr_KAGBLRoSQ":{"Comment":"Go up Tokyo Tower on clear days to get views of Mt. Fuji","User":"Leon Burns"},"-LcuDmWKkljAlhtH_88N":{"Comment":"Visit Shibuya when in Tokyo","User":"Josh Hardy"}`

### POST /removecomments
Deletes the comment specified by the user.
#### Resource URL
`https://prog-term-2-1554120616714.firebaseapp.com/removecomments`
#### Resource Information
* Resource format - JSON
* Requires authentication? - Yes
* Rate limited? - No
#### Parameters
* country_name - Required - The name of the country you want to get comments for.
* comment_id - Required - The unique id of the comment you want to remove.
* accessToken - Optional - You can send the access token as a parameter if it isn't already provided.
#### Example Request
`POST https://prog-term-2-1554120616714.firebaseapp.com/removecomments?comment_id=-LcuDlMmmr_KAGBLRoSQ&country_name=Japan`
#### Example Response
The server sends a 200 response once the comment has been deleted.

### GET /userlist
Returns a list of all users in the database and includes the user's name, email address and unique id.
#### Resource URL
`https://prog-term-2-1554120616714.firebaseapp.com/userlist`
#### Resource Information
* Resource format - JSON
* Requires authentication? - No
* Rate limited? - No
#### Parameters
* No Parameters are needed
#### Example Request
`GET https://prog-term-2-1554120616714.firebaseapp.com/userlist`
#### Example Response
`{"109310035031010515399":{"Email":"AbbyGregory@test.com","Name":"Abby Gregory"}},{"109310374657485515079":{"Email":"SeanRandall@test.com","Name":"Sean Randall"}},{"104635487346583726378":{"Email":"DaisyArnold@test.com","Name":"Daisy Arnold"}}`

### GET /admins
Returns a list of all admins in the database and includes the user's name, email address and unique id.
#### Resource URL
`https://prog-term-2-1554120616714.firebaseapp.com/admins`
#### Resource Information
* Resource format - JSON
* Requires authentication? - No
* Rate limited? - No
#### Parameters
* No Parameters are needed
#### Example Request
`GET https://prog-term-2-1554120616714.firebaseapp.com/admins`
#### Example Response
`{"109310035031010515399":{"Email":"AbbyGregory@test.com","Name":"Abby Gregory"}},{"109310374657485515079":{"Email":"SeanRandall@test.com","Name":"Sean Randall"}}`

### POST /user
Adds the username, email address and unique id of the user when they sign in.
#### Resource URL
`https://prog-term-2-1554120616714.firebaseapp.com/user`
#### Resource Information
* Resource format - JSON
* Requires authentication? - Yes
* Rate limited? - No
#### Parameters
* userid - Required - The unique id of the user that is signed into the app. This is also the location where the user's details will be stored.
* accessToken - Optional - You can send the access token as a parameter if it isn't already provided.
#### Example Request
`POST https://prog-term-2-1554120616714.firebaseapp.com/user?userid=109310035031010515399`
#### Example Response
Successfully adds the user to the database and returns a 200 response code. The user will be added in the form;
`{"109310035031010515399":{"Email":"AbbyGregory@test.com","Name":"Abby Gregory"}}`

### POST /addcomments
Posts the comment, comment_id and username of the user who has posted the comment.
#### Resource URL
`https://prog-term-2-1554120616714.firebaseapp.com/addcomments`
#### Resource Information
* Resource format - JSON
* Requires authentication? - Yes
* Rate limited? - No
#### Parameters
* selectedcountry - Required - The country of what the comment is talking about. This is also the location of where the comment will be stored.
* accessToken - Optional - You can send the access token as a parameter if it isn't already provided.
#### Example Request
`POST https://prog-term-2-1554120616714.firebaseapp.com/addcomment?selectedcountry=Canada`
#### Example Response
Successfully adds the comment to the database and returns a 200 response code. The comment will look like this;
`{"-LcuDlMmmr_KAGBLRoSQ":{"Comment":"Go to Tokyo Tower on clear days to get views of Mt. Fuji","User":"Leon Burns"}`
