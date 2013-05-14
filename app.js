'use strict';

var http = require('http')
,	config = require('./config')
,	port = process.env.PORT || 8080;

http.createServer(function (req, res) {
	//avoid double call if it's a browser call for favicon
	if(req.url.indexOf('favicon') !== -1)
		return;

	var ip = req.headers['remote-addr'] || req.headers['x-forwarded-for'];
	if(ip) {
		getIPInfo(ip, function(data, error) {
			printResult(res, data, error);
		});
	}
	else {
		console.log(JSON.stringify(req.headers));
		printResult(res, null, 'Could not find the originating IP address');
	}
}).listen(port, function() {
	console.log('Listening on port ' + port);
});

var printResult = function(res, data, error) {
	if(error) {
		data = JSON.stringify({'error': error});
	}
	res.writeHead(200, {'Content-Type': 'application/json'});
  	res.end(data);
};

var getIPInfo = function(ip, callback) {
	var url = config.url + '?key=' + config.apiKey + '&ip=' + ip + '&output=json&timezone=true';
	var req = http.request(url, function(response) {
  		response.on('data', function (data) {
			callback(data, false);
		});
	});

	//abort request if it takes over 10 seconds
	req.setTimeout(10000, function() {
		req.abort();
		console.log('Call to ipinfodb timed out');
		callback(null, 'Timeout occured');
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
		callback(null, 'Error occured while trying to identify IP address');
	});

	req.end();
};