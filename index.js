const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain'); 

    if (req.url === '/') {
        res.write('Hello World!');
        res.end();
    } else if (req.url === '/hello') {
        res.write('Hello there!');
        res.end();
    } else if (req.url === '/goodbye') {
        res.write('Goodbye!');
        res.end();
    } else {
        res.writeHead(404); 
        res.write('Not Found');
        res.end();
    }
});

server.listen(5000, () => {
    console.log('Listening on Port 5000');
});