// AWS configuration
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Batch initialize
var batch = require('./batch.sh');
batch.startHotAsksScheduler();

// Data Container
var Set = require('Set');

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
    Limit : '10',
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
  };

  dynamodb.scan(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
    }
    else {
      console.log(data); // successful response
      res.json(data);
    }
  });
});

// makeNewAsks
app.post('/makeNewAsk', function (req, res) {
  console.log("body: " + JSON.stringify(req.body));

  var currentTime = new Date().getTime().toString();
  var language = "*";
  // FIXME : '*' is used for temporary, we should change this value to proper languge client sent.
  //         req.headers["accept-language"].split(',')[0].toLowerCase();
  var userId = req.body.askerId;
  var userName = req.body.askerName;
  var yesnoIndex = userId+"#"+currentTime;

  var params = {
    Item: {
      "date": {
        "S": currentTime
      },
      "index": {
        "S": yesnoIndex
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
      },
      "gender" : {
        "S": req.body.gender
      },
      "age": {
        "S": req.body.age
      },
      "secret": {
        "S": req.body.secret
      },
      "profileImage": {
        "S": req.body.profileImage
      },
    },
    TableName: 'yesno'
  };

  dynamodb.putItem(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      res.json(err);
      return;
    }
    else {
      console.log(JSON.stringify(data));
      if (JSON.stringify(data) === "{}")
        res.json('{"result" : "New Ask created"}');
    }
  });

  // Find #tags and put tags to yesnoTag table
  if (req.body.mainContent.indexOf('#') !== -1) {
    console.log("main content has tag");

    var words = req.body.mainContent.split(/\s+/);
    var tagSet = new Set();

    for (var i in words) {
      if (words[i][0] === '#') {
        tagSet.add(words[i]);
      }
    }

    var tags = tagSet.toArray();

    for (var i in tags) {
      console.log(tags[i]);
      var params = {
        Item: {
          "index": {
            "S": yesnoIndex+'/'+i.toString()
          },
          "yesnoIndex": {
            "S": yesnoIndex
          },
          "tag": {
            "S": tags[i]
          },
          "date": {
            "S": new Date().getTime().toString(),
          },
        },
        TableName: 'yesnoTag'
      };
      dynamodb.putItem(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
        }
        else {
          console.log(JSON.stringify(data));
        }
      });
    }
  }
});


// getNewAsks
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
      res.json(err);
    }
    else {
      console.log(data); // successful response
      res.json(data);
    }
  });
});


// getHotAsks
app.post('/getHotAsks', function (req, res) {
  if (batch.hotAsks && batch.hotAsks.Items.length > 0) {
    console.log("batch.hotAsks data exist, use this");

    for (var it = 0; it < batch.hotAsks.Items.length; it++) {
      batch.hotAsks.Items[it]['rank'] = it+1;
      if (it === 2) break;
    }

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
      res.json(err);
    }
    else {
      console.log(data); // successful response
      if (data && data.Items.length > 0) {
        for (var it = 0; it < data.Items.length; it++) {
          data.Items[it]['rank'] = it+1;
          if (it === 2) break;
        }
      }
      res.json(data);
    }
  });
});


// getMyAsks
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
      res.json(err);
    }
    else {
      console.log(data); // successful response
      res.json(data);
    }
  });
});

app.post('/getAskByIndex', function (req, res) {
  console.log("body: " + JSON.stringify(req.body));

  var params = {
    TableName: 'yesno',
    IndexName: 'index-index',
    KeyConditions: {
      index: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [
          {
            S: req.body.index,
          }
        ],
      },
    },
    ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
};

  dynamodb.query(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
      res.json(err);
    }
    else {
      res.json(data);
    }
  });
});


app.post('/getMyVotedAsks', function (req, res) {
  console.log("body: " + JSON.stringify(req.body));

  var params = {
    TableName: 'yesnoPoll',
    IndexName: 'userid-date-index',
    KeyConditions: { // indexed attributes to query
                     // must include the hash key value of the table or index
      userid: {
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
      res.json(err);
    } else {
      console.log(data); // successful response

      if (data.Items.length < 1) {
        console.log("data.Items is empty");
        res.json(data);
        return;
      }

      var myVotedAsks = { "Items": [], "Count": 0, "ScanCount": 0 };
      for (var it = 0; it < data.Items.length; it++) {
        var params = {
          TableName: 'yesno',
          IndexName: 'index-index',
          KeyConditions: { // indexed attributes to query
                           // must include the hash key value of the table or index
            index: {
              ComparisonOperator: 'EQ',
              AttributeValueList: [
                {
                  S: data.Items[it].yesnoIndex.S
                }
              ]
            }
          }
        };

        dynamodb.query(params, function(err, yesnoData) {
          if (err) {
            console.log(err); // an error occurred
          } else {
            var order;
            for (order = 0; order < data.Items.length; order++) {
              if (data.Items[order].yesnoIndex.S ===
                  yesnoData.Items[0].index.S) {
                break;
              }
            }
            myVotedAsks.Items[order] = yesnoData.Items[0];
            if (data.Items[order].yes_no.N === "1") {
              console.log("voted yes");
              myVotedAsks.Items[order].voted = "yes";
            } else {
              console.log("voted no");
              myVotedAsks.Items[order].voted = "no";
            }

            myVotedAsks.Count++;
          }
          myVotedAsks.ScanCount++;

          if (data.Items.length === myVotedAsks.ScanCount) {
            console.log("response myVotedAsks");
            console.log(myVotedAsks);
            res.json(myVotedAsks);
          }
        });
      }
    }
  });
})

// makeNewVote
app.post('/makeNewVote', function (req, res) {
  console.log("start! "+JSON.stringify(req.body));
  var currentTime = new Date().getTime().toString();
  var userId = req.body.askerId;
  var yesnoIndex = req.body.index;
  var date = yesnoIndex.substr(yesnoIndex.lastIndexOf("#")+1,13);
  var yes_no = req.body.yesno;

  var params = {
    Item: {
      "date": {
        "S": currentTime
      },
      "index": {
        "S": yesnoIndex+'/'+userId
      },
      "yesnoIndex": {
        "S": yesnoIndex
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
          S: yesnoIndex
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
          S: yesnoIndex
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
                S: yesnoIndex
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
        } else {
          console.log(data); // successful response
          res.json(data);
        }
      });
    }
  });
});


// getSearchAsksByTags
app.post('/getSearchAsksByTag', function (req, res) {

  var params = {
    TableName: 'yesnoTag',
    IndexName: 'tag-date-index',
    KeyConditions: { // indexed attributes to query
                     // must include the hash key value of the table or index
      tag: {
        ComparisonOperator: 'EQ', // (EQ | NE | IN | LE | LT | GE | GT | BETWEEN |
        AttributeValueList: [
          {
            S: req.body.tag,
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
      res.json(err);
    }
    else {
      console.log(data); // successful response

      if (data.Items.length < 1) {
        console.log("data.Items is empty");
        res.json(data);
        return;
      }

      var searchAsks = { "Items": [], "Count": 0, "ScanCount": 0 };
      for (var it=0; it < data.Items.length; it++) {
        var params = {
          TableName: 'yesno',
          IndexName: 'index-index',
          KeyConditions: { // indexed attributes to query
                           // must include the hash key value of the table or index
            index: {
              ComparisonOperator: 'EQ',
              AttributeValueList: [
                {
                  S: data.Items[it].yesnoIndex.S
                }
              ]
            }
          }
        };

        dynamodb.query(params, function(err, yesnoData) {
          if (err){
            console.log(err); // an error occurred
            searchAsks.ScanCount++;
            if (data.Items.length === searchAsks.ScanCount) {
              console.log("response searchAsks");
              console.log(searchAsks);
              res.json(searchAsks);
            }
          }
          else {
            searchAsks.Items.push(yesnoData.Items[0]);
            searchAsks.Count++;
            searchAsks.ScanCount++;
            if (data.Items.length === searchAsks.ScanCount) {
              console.log("response searchAsks");
              console.log(searchAsks);
              res.json(searchAsks);
            }
          }
        });
      }
    }
  });
});

app.post('/getVoted', function (req, res) {
  var askerId = req.body.askerId;
  var index = req.body.index;
  var yesnoPollIndex = index+'/'+askerId;
  console.log(yesnoPollIndex);
  var params = {
    TableName: 'yesnoPoll',
    IndexName: 'index-index',
    KeyConditions: {
      index: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [
          {
            S: yesnoPollIndex
          }
        ]
      }
    }
  };

  dynamodb.query(params, function(err, data) {
    if (err){
      console.log(err); // an error occurred
      res.json(err);
    }
    else {
      console.log(data);
      if (data.Count === 0) {
        console.log("there is no data");
        var noneItem = { "voted" : "none" };
        data.Items.push(noneItem);
      } else if (data.Items[0].yes_no.N === "1") {
        console.log("voted yes");
        data.Items[0].voted = "yes"
      } else {
        console.log("voted no");
        data.Items[0].voted = "no"
      }
      console.log(data); // successful response
      res.json(data);
    }
  });
});

var server = app.listen(5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
