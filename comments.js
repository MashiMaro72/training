// create web server
// create a server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');

var comments = [];

http.createServer(function(req,res){
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    if (pathname == '/'){
        // read the index.html file and return it
        fs.readFile('./index.html',function(err,data){
            res.writeHead(200,{'content-type':'text/html'});
            res.end(data);
        });
    } else if (pathname == '/post'){
        // get the content from the request body
        var body = '';
        req.setEncoding('utf8');
        req.on('data',function(chunk){
            body += chunk;
        });
        req.on('end',function(){
            // parse the data and save it to comments
            var obj = JSON.parse(body);
            obj.time = new Date();
            comments.push(obj);
            res.end(JSON.stringify(comments));
        });
    } else if (pathname == '/get'){
        // return the comments
        var query = urlObj.query;
        if (query){
            var start = parseInt(query.split('=')[1]);
            var items = comments.slice(start,start+5);
            var str = JSON.stringify(items);
            res.end(str);
        } else {
            res.end(JSON.stringify(comments));
        }
    } else {
        // read the file and return it
        fs.readFile(path.join(__dirname,pathname),function(err,data){
            if (err){
                res.writeHead(404,{'content-type':'text/plain'});
                res.end('Resource not found');
            } else {
                res.writeHead(200,{'content-type':mime.lookup(pathname)});
                res.end(data);
            }
        });
    }
}).listen(8080,function(){
    console.log('Server started on port 8080');
});
// create a server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');

var comments = [];

http.createServer(function(req,res){
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    if (pathname == '/'){
        // read the index.html file and return it
        fs.readFile('./index.html',function(err,data){
            res.writeHead(200,