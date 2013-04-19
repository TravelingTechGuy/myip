var http = require('http');
var config = require('./config');
var port = process.env.PORT || 8080;

http.createServer(function (req, res) {
	//avoid double call if it's a browser call for favicon
	if(req.url.indexOf('favicon') != -1)
		return;
	
	var ip = req.headers["remote-addr"] || req.headers["x-forwarded-for"];
	if(ip) {
		getIPInfo(ip, function(data) {
			printResult(res, data);
		});
	}
	else {
		console.log(JSON.stringify(req.headers));
		printResult(res, JSON.stringify({'error': 'Could not find the originating IP address'}));
	}
  	
}).listen(port, function() {
	console.log('Listening on port ' + port);
});

var printResult = function(res, data) {
	res.writeHead(200, {'Content-Type': 'application/json'});
  	res.end(data);
};

var getIPInfo = function(ip, callback) {
	var url = config.url + "?key=" + config.apiKey + "&ip=" + ip + "&output=json&timezone=true";
	var req = http.request(url, function(response) {
  		response.on('data', function (data) {
    		callback(data);
  		});
	});

	req.on('error', function(e) {
  		console.log('problem with request: ' + e.message);
	});

	req.end();
};