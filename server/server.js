var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var AWS = require('aws-sdk');

AWS.config.update({region: 'ap-northeast-1'});

var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});

app.post('/makeNewAsk', function (req, res) {
  console.log("body: " + JSON.stringify(req.body));

  var currentTime = new Date().getTime().toString();
  var language = req.headers["accept-language"].split(',')[0].toLowerCase();
  var userId = req.body.askerId;

  var params = {
    Item: {
      "date": {
        "S": currentTime
      },
      "index": {
        "S": userId+currentTime
      },
      "language": {
        "S": language
      },
      "mainContent": {
        "S": req.body.mainContent,
      },
      "noContent": {
         "S": req.body.noContent
      },
      "noCount": {
        "N": "0"
      },
      "userId": {
        "S": userId
      },
      "voteCount": {
        "N": "0"
      },
      "yesContent": {
        "S": req.body.yesContent
      },
      "yesCount": {
        "N": "0"
      }
    },
    TableName: 'yesno'
  };

  dynamodb.putItem(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      res.json(err);
    }
    else {
      console.log(JSON.stringify(data));
      if (JSON.stringify(data) === "{}")
        res.json('{"result" : "New Ask created"}');
    }
  });
});

app.post('/getNewAsks', function (req, res) {
  var language = req.headers["accept-language"].split(',')[0].toLowerCase();
  var params = {
    TableName: 'yesno',
    IndexName: 'language-date-index',
    KeyConditions: { // indexed attributes to query
                     // must include the hash key value of the table or index
      language: {
        ComparisonOperator: 'EQ', // (EQ | NE | IN | LE | LT | GE | GT | BETWEEN |
        AttributeValueList: [
          {
            S: language,
          }
        ],
      },
      date: {
        ComparisonOperator: 'LE',
        AttributeValueList: [
          {
            S: req.body.date,
          }
        ],
      },
    },
    ScanIndexForward: false,
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
    Limit : 20,
};

  dynamodb.query(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
    }
    else {
      console.log(data); // successful response
      for (var i in data.Items) {
         i = data.Items[i];
         console.log(i.mainContent);
         console.log(i.yesContent);
      }
      res.json(data);
    }
  });
});

app.get('/scan', function (req, res) {
  var params = {
    TableName: 'yesno',
    ScanFilter: {
      date: {
        ComparisonOperator: 'GT',
        AttributeValueList: [
          {
            S: '0'
          }
        ]
      }
    },
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
  };

  dynamodb.scan(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
    }
    else {
      console.log(data); // successful response
      for (var i in data.Items) {
         i = data.Items[i];
         console.log(i.mainContent);
      }
      res.json(data);
    }
  });
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
