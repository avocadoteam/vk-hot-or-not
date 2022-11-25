import axios from 'axios';
import { writeFile } from 'fs';
import { join } from 'path';
var zipper = require('zip-local');

const targetFile = join(__dirname, '../dist/index.html');

const getIndexHTML = () => axios.get<string>('https://avocadoteam.github.io/vk-hot-or-not');

const main = async () => {
  let { data } = await getIndexHTML();
  writeFile(targetFile, data.replace(/="\/vk-hot-or-not/g, '="https://avocadoteam.github.io/vk-hot-or-not'), err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
    zipper.sync.zip(targetFile).compress().save('build.zip');
  });
};

main();
