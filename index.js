const http = require("http");

http.createServer((req,res) => {
    console.log(req.url)
    var path = req.url.toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Home Page');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('I\'m 31 years old and will be finishing my web devlopement certificate at Seattle Central College this semester');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
        break;
    }
}).listen(process.env.PORT || 3000);