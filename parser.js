var fs = require('fs'); 
var parser = require('./gramatica');


fs.readFile('./entrada2.txt', (err, data) => {
    if (err) throw err;
    parser.parse(data.toString());
});