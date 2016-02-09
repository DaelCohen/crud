'use strict';

const http = require('http');
const staticContent = require('node-static');

const hostname = '127.0.0.1';
const port = 1337;

const file = new staticContent.Server('./public');

// Item list
let items = ['Item1', 'Item2', 'Item3'];

http.createServer((req, res) => {
    if (req.url.indexOf('/items') !== -1) {
        manageRequest(req, res);
    } else {
        // Manage request for static content (index.html)
        req.addListener('end', () => {
            file.serve(req, res);
        }).resume();
    }
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function manageRequest(req, res) {
    switch (req.method) {
        case "GET":
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(items));
            break;
        case "POST":
        {
            let item = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                item += chunk;
            });
            req.on('end', function () {
                items.push(item);
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(item));
            });
            break;
        }
        case "PUT":
        {
            let index = req.url.slice(req.url.lastIndexOf('/') + 1);
            let item = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                item += chunk;
            });
            req.on('end', function () {
                items[index] = item;
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(item));
            });
            break;
        }
        case "DELETE":
        {
            let index = req.url.slice(req.url.lastIndexOf('/') + 1);
            let item = items.splice(index, 1);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(item));
            break;
        }
    }
}