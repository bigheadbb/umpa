var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

makeHotAsks = function() {
    console.log('HotAsksSchedule called, now date : ' + new Date());
    var NUMBER_MAX_VALUE = "999999999999999999999999";
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
              N: NUMBER_MAX_VALUE,
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
        exports.hotAsks = data;
        console.log(exports.hotAsks); // successful response
      }
    });
}

exports.startHotAsksScheduler = function() {
  console.log("startHotAsksScheduler start");
  makeHotAsks();
  setInterval( makeHotAsks, 600000);
}
