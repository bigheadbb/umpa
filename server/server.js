// AWS configuration
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Batch initialize
var batch = require('./batch.sh');
batch.startHotAsksScheduler();

// Express configuration
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

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
  var language = "*";
  // FIXME : '*' is used for temporary, we should change this value to proper languge client sent.
  //         req.headers["accept-language"].split(',')[0].toLowerCase();
  var userId = req.body.askerId;
  var userName = req.body.askerName;

  var params = {
    Item: {
      "date": {
        "S": currentTime
      },
      "index": {
        "S": userId+"#"+currentTime
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
      "userName": {
        "S": userName
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
  var language = "*";
  // FIXME : '*' is used for temporary, we should change this value to proper languge client sent.
  //         req.headers["accept-language"].split(',')[0].toLowerCase();
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
    Limit : 10,
};

  dynamodb.query(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
    }
    else {
      console.log(data); // successful response
      res.json(data);
    }
  });
});

app.post('/getHotAsks', function (req, res) {
  if (batch.hotAsks !== undefined && batch.hotAsks.Items.length > 0) {
    console.log("batch.hotAsks data exist, use this");
    batch.hotAsks.Items[0]['rank'] = 1;
    batch.hotAsks.Items[1]['rank'] = 2;
    batch.hotAsks.Items[2]['rank'] = 3;
    res.json(batch.hotAsks);
    return;
  }

  console.log("batch.hotAsks data empty, query now");

  var language = "*";
  // FIXME : '*' is used for temporary, we should change this value to proper languge client sent.
  //         req.headers["accept-language"].split(',')[0].toLowerCase();
  var oneWeekAgoDate = (new Date().getTime()) - 604800000;

  var params = {
    TableName: 'yesno',
    IndexName: 'language-voteCount-index',
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
      voteCount: {
        ComparisonOperator: 'LE',
        AttributeValueList: [
          {
            N: req.body.voteCount,
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
      data.Items[0]['rank'] = 1;
      data.Items[1]['rank'] = 2;
      data.Items[2]['rank'] = 3;
      res.json(data);
    }
  });
});


app.post('/getMyAsks', function (req, res) {
  console.log("body: " + JSON.stringify(req.body));

  var params = {
    TableName: 'yesno',
    IndexName: 'userId-date-index',
    KeyConditions: { // indexed attributes to query
                     // must include the hash key value of the table or index
      userId: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [
          {
            S: req.body.askerId,
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
    ScanIndexForward: false,  // false : reverse order by sort key value
                              // true : order by sort key value
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
    Limit : 10,
};

  dynamodb.query(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
    }
    else {
      console.log(data); // successful response
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

app.post('/makeNewVote', function (req, res) {
  console.log("start! "+JSON.stringify(req.body));
  var currentTime = new Date().getTime();
  var userId = req.body.askerId;
  var index = req.body.index;
  var date = index.substr(index.lastIndexOf("#")+1,13);
  var yes_no = req.body.yesno;

  var params = {
    Item: {
      "date": {
        "S": currentTime + ""
      },
      "index": {
        "S": index
      },
      "userid": {
        "S": userId
      },
      "yes_no": {
        "N": yes_no
      }
    },
    TableName: 'yesnoPoll'
  };

  console.log("now putItem..");
  dynamodb.putItem(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      res.json(err);
      return;
    }
    else {
      console.log(JSON.stringify(data));
    }
  });
  var new_params = {};
  console.log("date:",date);
  if (yes_no === "1") {
    new_params = {
      TableName: 'yesno',
      Key:{
        "index": {
          S: index
        },
        "date": {
          S: date
        }
      },
      AttributeUpdates: {
      "yesCount": {
        Action: 'ADD',
        Value: {
          N: "1"
        }
      },
      "voteCount": {
        Action: 'ADD',
        Value: {
          N: "1"
        }
      }
      }
    };
  } else {
    new_params = {
      TableName: 'yesno',
      Key:{
        "index": {
          S: index
        },
        "date": {
          S: date
        }
      },
      AttributeUpdates: {
      "noCount": {
        Action: 'ADD',
        Value: {
          N: "1"
        }
      },
      "voteCount": {
        Action: 'ADD',
        Value: {
          N: "1"
        }
      }
      }
    };
  }
  console.log("now updating..");
  dynamodb.updateItem(new_params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        res.json(err);
        return;
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
  });

  console.log("get yesCount and noCount start");
  var params = {
    TableName: 'yesno',
    IndexName: 'index-index',
    KeyConditions: { // indexed attributes to query
                     // must include the hash key value of the table or index
      index: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [
          {
            S: index
          }
        ]
      }
    }
  };
  dynamodb.query(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
      res.json(err);
      return;
    }
    else {
      console.log(data); // successful response
      var nocount = JSON.stringify(data.Items[0].noCount);
      var yescount = JSON.stringify(data.Items[0].yesCount);
      console.log("noCount: "+nocount);
      console.log("yesCount: "+yescount);
      res.json('{"yesCount" : ' + yescount + ' , noCount" : ' + nocount +'}');
    }
  });
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
