const {readdirSync, readFileSync} = require("fs");
const path = require('path')

let data = {}
let dataDirectory = "app/data";
let files = readdirSync(dataDirectory);

files.forEach((file) => {
    try {
        const name = path.parse(file).name
        const filepath = path.resolve(dataDirectory, file)

        data[name] = JSON.parse(readFileSync(filepath, 'utf8'))
    } catch (err) {
        console.error(err)
    }
});

module.exports = data
