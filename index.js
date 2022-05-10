// index.js
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const {
    convertAll
} = require('bpmn-to-image');

saveBpmnImage();

function saveBpmnImage() {
    var processFile = 'src/main/resources/bpmn/antragsverarbeitung-v1.bpmn';
    var processImgFile = processFile.replace(".bpmn", ".png");
    var processImgFileContent = '';

    convertAll([
        {
            input: processFile,
            outputs: [processImgFileContent]
        }
    ]);

    fs.writeFileSync(processImgFile, processImgFileContent);

    generateReadMe(processFile, processImgFile);
}

function generateReadMe(processImgFile, processimagepath) {
    var DATA = {
        name: 'Mani',
        processname: processImgFile,
        processimagepath: processimagepath
    };
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
}