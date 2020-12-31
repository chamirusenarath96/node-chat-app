var moment = require('moment');

var someTimeStamp = moment().valueOf();
var createdAt = 12314;
var date = moment(someTimeStamp);
console.log(date.format('h:mm a'));
