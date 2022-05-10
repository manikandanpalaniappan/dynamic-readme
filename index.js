// index.js
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const {
    convertAll
} = require('bpmn-to-image');
const imgur = require('imgur');

/**
 * DATA is the object that contains all
 * the data to be provided to Mustache
 * Notice the "name" and "date" property.
 */
let DATA = {
    name: 'Mani',
    date: new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone: 'Europe/Berlin',
    }),
};

/**
 * A - We open 'main.mustache'
 * B - We ask Mustache to render our file with the data
 * C - We create a README.md file with the generated output
 */
function generateReadMe() {
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
}

// generateReadMe();

function saveBpmnImage() {
    const processFile = 'src/main/resources/pizza-collaboration.bpmn';
    const processImgFile = processFile.replace("bpmn", "png");
    convertAll([
        {
            input: processFile,
            outputs: [processImgFile]
        }
    ]);

    response = imgur.uploadFile(processImgFile);
}

saveBpmnImage();