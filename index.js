// index.js
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const {
    convertAll
} = require('bpmn-to-image');

saveBpmnImage();

async function saveBpmnImage() {
    var processFile = 'src/main/resources/bpmn/antragsverarbeitung-v1.bpmn';
    var processImgFile = processFile.replace(".bpmn", ".png");

    await convertAll([
        {
            input: processFile,
            outputs: [processImgFile]
        }
    ]);

    generateReadMe(processImgFile);
}

function generateReadMe(processimagepath) {
    var DATA = {
        name: 'Mani',
        processimagepath: processimagepath
    };
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
}