const fs = require('fs');

const basicFileHelper = (inputFile, callback) => {
    return new Promise((resolve, reject) => {
        fs.readFile(inputFile, 'utf8' , (err, data) => {
            if (err) {
              console.error(err)
              return;
            }
    
            resolve(callback(data));
        });
    })
};

module.exports = basicFileHelper;