const fs = require('fs');

const fileParser = (inputFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(inputFile, 'utf8' , (err, data) => {
            if (err) {
              console.error(err)
              return;
            }
    
            resolve(data);
        });
    })
};

module.exports = fileParser;