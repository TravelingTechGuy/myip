var http = require('http');
var config = require("./config");

http.createServer(function (req, res) {
	var ip = req.headers["remote-addr"] || "127.0.0.1";
	getIPInfo(ip, res, printResult);
  	
}).listen(config.port);
console.log('Server running at ' + config.port);

var printResult = function(res, data) {
	res.writeHead(200, {'Content-Type': 'application/json'});
  	res.end(data);
};

var getIPInfo = function(ip, res, callback) {
	var url = config.url + "?key=" + config.apiKey + "&ip=" + ip + "&output=json&timezone=true";
	var req = http.request(url, function(response) {
  		response.on('data', function (data) {
    		callback(res, data);
  		});
	});

	req.on('error', function(e) {
  		console.log('problem with request: ' + e.message);
	});

	req.end();
};