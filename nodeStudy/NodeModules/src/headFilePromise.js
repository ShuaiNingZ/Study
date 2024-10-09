const fs = require('fs').promises;
const path = require('path');

fs.readFile('./1.js', 'utf8')
  .then(data => {
      console.log(data)
      return fs.writeFile('./1.js', data + '你好')
  })
  .catch(err => {
      throw err
  })