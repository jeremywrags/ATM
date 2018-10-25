var express = require('express');
var router = express.Router();
var request = require("request");
var config = require('config');
console.log('ClientID: ' + process.env.ClientID);
console.log('ClientID: ' + process.env.ClientSeceret);
console.log('ClientID: ' + process.env.CustomerKey);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ATM Example' });
});

/* GET home page. */
router.get('/balanceinquiry', function(req, res, next) {  
  
  getAuthToken(function(err, access_token){  

    console.log('access_token: ' + access_token);
    var options2 = { method: 'POST',
      url: 'https://na5.thunderhead.com/one/oauth2/rt/api/2.0/interaction',
      qs: { sk: 'ONE-LJBKEO4Y7J-5669' },
      headers: 
      { 'Postman-Token': 'f4e190b4-49c2-4e6e-9c0c-038d1a44a474',
        'Cache-Control': 'no-cache',
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/json' },
      body: 
      { customerKey: process.env.CustomerKey,
        uri: 'atm://atm/offer',
        properties: [ { name: 'action', value: 'balanceInquiry' } ] },
      json: true 
    };

    
    request(options2, function (error, response, body) {      
      if (error){
        throw new Error(error);
      } 
      try{
        var d = new Buffer(body.optimizations[0].data, 'base64').toString('ascii');
        res.send({ 
          Body: d,  
          Balance: '$35,324' 
        });
      }catch(exception){
        res.send({ 
          Body: "No optimizations were returned at this time.",  
          Balance: '$35,324' 
        });
      }
      
      console.log(body);
    });    
  });
});

function getAuthToken(callback) {
  var ci = process.env.ClientID;
  var cs = process.env.ClientSeceret;
  var cics = ci + ":" + cs;
  let buff = new Buffer(cics);  
  let base64data = buff.toString('base64');  

  console.log('ClientID: ' + ci);
  console.log('ClientSeceret: ' + cs);
  console.log('CombinedKey: ' + cics);
  console.log('base64data: ' + base64data);
  
  
  var options = { method: 'POST',
    url: 'https://na5.thunderhead.com/one/oauth2token',
    headers: 
      { 'Content-Type': 'application/x-www-form-urlencoded',
        'Postman-Token': 'e4db24b7-3586-407e-b330-bd69d6373d66',
        'Cache-Control': 'no-cache',
        Authorization: 'Basic ' + base64data + 'YQ==' },     
    form: { grant_type: 'client_credentials' } 
  };

  request(options, function (error, response, body) {
    if (error){
      return callback(err);
    }
    try{
      console.log('authTiokenBody: ' + body);
      callback(null, JSON.parse(body).access_token);
    }catch(err){
      callback(err);
    }
  });
}

module.exports = router;