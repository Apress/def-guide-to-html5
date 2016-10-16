var http = require('http');
var querystring = require('querystring');

http.createServer(function (req, res) {
  switch(req.url) {
    case '/form':
        if (req.method == 'POST') {
         console.log("[200] " + req.method + " to " + req.url);
         var fullBody = '';
         req.on('data', function(chunk) {
           fullBody += chunk.toString();
         });
         req.on('end', function() {
           res.writeHead(200, "OK", {'Content-Type': 'text/html'});  
           res.write('<html><head><title>Post data</title></head><body>');
           res.write('<style>th, td {text-align:left; padding:5px; color:black}\n');
           res.write('th {background-color:grey; color:white; min-width:10em}\n');
           res.write('td {background-color:lightgrey}\n');
           res.write('caption {font-weight:bold}</style>');
           res.write('<table border="1"><caption>Form Data</caption>');
           res.write('<tr><th>Name</th><th>Value</th>');
           var dBody = querystring.parse(fullBody);
           for (var prop in dBody) {
            res.write("<tr><td>" + prop + "</td><td>" + dBody[prop] + "</td></tr>");
           }
           res.write('</table></body></html>');
           res.end();
         });
       } else {
         console.log("[405] " + req.method + " to " + req.url);
         res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
         res.end('<html><head><title>405 - Method not supported</title></head><body>' +
                 '<h1>Method not supported.</h1></body></html>');
       }
      break;
    default:
      res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
      res.end('<html><head><title>404 - Not found</title></head><body>' +
              '<h1>Not found.</h1></body></html>');
      console.log("[404] " + req.method + " to " + req.url);
  };
}).listen(8080);
