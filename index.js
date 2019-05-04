let restify = require('restify');
let services = require('./src/services');

let server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.post('/importProduct', services.importProduct);
server.post('/exportProduct', services.exportProduct);
server.get('/listProduct', services.listProduct);
server.get('/billing', services.billing);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});