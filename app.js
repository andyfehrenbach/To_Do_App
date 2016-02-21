var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var taskData = require('./routes/task_data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/task_data', taskData);

app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Marshmallows toasting on port ', app.get('port'));
});
