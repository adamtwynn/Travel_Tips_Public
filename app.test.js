'use strict';

const request = require('supertest');
const app = require('./app');
const nock = require('nock');


describe('Test pages that don\'t exist', () => {

    test('GET /list returns 404', () => {

        return request(app)
            .get('/list')
            .expect(404);
    });

    test('POST /list returns 404', () => {
        return request(app)
            .post('/list')
            .expect(404);
    });
});

describe('Test the countries service using mocking', () => {

    nock('https://restcountries.eu/')
        .persist()
        .get('/rest/v2/name/Japan')
        //Data from restcountries.eu
        .reply(200, [{'name':'Japan','topLevelDomain':['.jp'],'alpha2Code':'JP','alpha3Code':'JPN','callingCodes':['81'],'capital':'Tokyo','altSpellings':['JP','Nippon','Nihon'],'region':'Asia','subregion':'Eastern Asia','population':126960000,'latlng':[36.0,138.0],'demonym':'Japanese','area':377930.0,'gini':38.1,'timezones':['UTC+09:00'],'borders':[],'nativeName':'日本','numericCode':'392','currencies':[{'code':'JPY','name':'Japanese yen','symbol':'¥'}],'languages':[{'iso639_1':'ja','iso639_2':'jpn','name':'Japanese','nativeName':'日本語 (にほんご)'}],'translations':{'de':'Japan','es':'Japón','fr':'Japon','ja':'日本','it':'Giappone','br':'Japão','pt':'Japão','nl':'Japan','hr':'Japan','fa':'ژاپن'},'flag':'https://restcountries.eu/data/jpn.svg','regionalBlocs':[],'cioc':'JPN'}]);

    test('GET /country?country_name=Japan succeeds', () => {
        return request(app)
            .get('/country?country_name=Japan')
            .expect(200);
    });

    test('GET /country?country_name=Japan returns JSON', () => {
        return request(app)
            .get('/country?country_name=Japan')
            .expect('Content-type', /json/);
    });

    test('GET /country?country_name=Japan includes Tokyo', () => {
        return request(app)
            .get('/country?country_name=Japan')
            .expect(/Tokyo/);
    });

    test('GET /country?country_name=Japan includes 日本語', () => {
        return request(app)
            .get('/country?country_name=Japan')
            .expect(/日本語/);
    });

    test('GET /country?country_name=Japan includes population', () => {
        return request(app)
            .get('/country?country_name=Japan')
            .expect(/population/);
    });

    nock('https://restcountries.eu/')
        .get('/rest/v2/name/London')
        .reply(404);

    test('GET /country?country_name=London returns a blank string if country doesn\'t exist', () => {
        return request(app)
            .get('/country?country_name=London')
            .expect('');
    });

    nock('https://restcountries.eu/')
        .get('/rest/v2/name/')
        .reply(404);

    test('GET /country?country_name=London returns a blank string no country is entered', () => {
        return request(app)
            .get('/country?country_name=')
            .expect('');
    });

});

describe('Test the external database using mocking', () => {

    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .persist()
        .get('/Comments/China.json')
        .reply(404);

    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .persist()
        .get('/Comments/.json')
        .reply(404);

    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .persist()
        .get('/Comments/Canada.json')
        .reply(200, {
            '-Lc7xC3b8lNjO6hJvtky' : {
                'Comment' : 'Prepare for winter weather conditions',
                'User' : 'Daisy Arnold'
            },
            '-LdOfqz7c5kk8gFnSx3E' : {
                'Comment' : 'Visit the Banff National Park of Canada',
                'User' : 'Sean Randall'
            },
            '-LdOfrZfrNdO1YTVnK-g' : {
                'Comment' : 'Go to on a boat trip to Niagara Falls',
                'User' : 'Jean Wright'
            }
        });

    test('GET /comments succeeds', () => {
        return request(app)
            .get('/comments?country_name=Canada')
            .expect(200);
    });

    test('GET /comments?country_name=Canada returns JSON', () => {
        return request(app)
            .get('/comments?country_name=Canada')
            .expect('Content-type', /json/);
    });

    test('GET /comments?country_name=Canada includes Niagara Falls', () => {
        return request(app)
            .get('/comments?country_name=Canada')
            .expect(/Niagara Falls/);
    });

    test('GET /comments?country_name=China returns blank string if undefined', () => {
        return request(app)
            .get('/comments?country_name=China')
            .expect('');
    });

    test('GET /comments?country_name= returns blank string if no country is selected', () => {
        return request(app)
            .get('/comments?country_name=')
            .expect('');
    });


    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .get('/Users.json')
        .reply(404);

    test('GET /userlist returns blank string if no users exist', () => {
        return request(app)
            .get('/userlist')
            .expect('');
    });

    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .persist()
        .get('/Users.json')
        .reply(200, {
            '2' : {
                'Email' : 'daisyarnold@test.com',
                'Name' : 'Daisy Arnold'
            },
            '3' : {
                'Email' : 'seanrandall@test.com',
                'Name' : 'Sean Randall'
            },
            '4' : {
                'Email' : 'jeanwright@test.com',
                'Name' : 'Jean Wright'
            },
            '109310035031010515399' : {
                'Email' : 'admin@test.com',
                'Name' : 'Admin User'
            }
        });

    test('GET /userlist succeeds', () => {
        return request(app)
            .get('/userlist')
            .expect(200);
    });

    test('GET /userlist returns JSON', () => {
        return request(app)
            .get('/userlist')
            .expect('Content-type', /json/);
    });

    test('GET /userlist includes Admin', () => {
        return request(app)
            .get('/userlist')
            .expect(/Admin/);
    });

    test('GET /userlist includes admin@test.com', () => {
        return request(app)
            .get('/userlist')
            .expect(/admin@test.com/);
    });


    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .get('/Admins.json')
        .reply(404);

    test('GET /admins returns blank string if undefined', () => {
        return request(app)
            .get('/admins')
            .expect('');
    });

    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .persist()
        .get('/Admins.json')
        .reply(200, {
            '109310035031010515399' : {
                'Email' : 'admin@test.com',
                'Name' : 'Admin User'
            }
        });

    test('GET /admins succeeds', () => {
        return request(app)
            .get('/admins')
            .expect(200);
    });

    test('GET /admins returns JSON', () => {
        return request(app)
            .get('/admins')
            .expect('Content-type', /json/);
    });

    test('GET /admins includes "Admin User"', () => {
        return request(app)
            .get('/admins')
            .expect(/Admin User/);
    });

    test('GET /admins includes "admin@test.com"', () => {
        return request(app)
            .get('/admins')
            .expect(/admin@test.com/);
    });



    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .delete('/Comments/Japan/-LcuDmWKkljAlhtH_88N.json?access_token=undefined')
        .reply(403);


    test('POST /removecomments needs auth', () => {
        return request(app)
            .post('/removecomments?comment_id=-LcuDmWKkljAlhtH_88N&country_name=Japan')
            .expect(403);
    });

    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .delete('/Comments/Japan/-LcuDmWKkljAlhtH_88N.json?access_token=token')
        .reply(200, 'Success');

    test('POST /removecomments succeeds', () => {
        return request(app)
            .post('/removecomments?comment_id=-LcuDmWKkljAlhtH_88N&country_name=Japan&accessToken=token')
            .expect(200);
    });


    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .put('/Users/5.json?access_token=undefined')
        .reply(403);

    test('POST /user needs auth', () => {
        return request(app)
            .post('/user?userid=5')
            .send({Email:'test@test.com',Name:'Test'})
            .expect(403);
    });
    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .put('/Users/5.json?access_token=token')
        .reply(200);

    test('POST /user succeeds', () => {
        return request(app)
            .post('/user?userid=5&accessToken=token')
            .send({Email:'test@test.com',Name:'Test'})
            .expect(200);
    });



    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .post('/Comments/Japan.json?access_token=undefined')
        .reply(403);

    test('POST /addcomments needs auth', () => {
        return request(app)
            .post('/addcomments?selectedcountry=Japan')
            .send({User:'Test User',Comment:'Test Comment'})
            .expect(403);
    });

    nock('https://prog-term-2-1554120616714.firebaseio.com')
        .post('/Comments/Japan.json?access_token=token')
        .reply(200);

    test('POST /addcomments succeeds', () => {
        return request(app)
            .post('/addcomments?selectedcountry=Japan&accessToken=token')
            .send({User:'Test User',Comment:'Test Comment'})
            .expect(200);
    });


});
