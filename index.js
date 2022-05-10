// index.js
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
const {
    convertAll
} = require('bpmn-to-image');

saveBpmnImage();

function saveBpmnImage() {
    const processFile = 'src/main/resources/bpmn/antragsverarbeitung-v1.bpmn';
    const processImgFile = processFile.replace(".bpmn", ".png");
    const processImgFileContent = '';

    convertAll([
        {
            input: processFile,
            outputs: [processImgFileContent]
        }
    ]);

    fs.writeFileSync(processImgFile, processImgFileContent);

    generateReadMe(processFile, processImgFile);
}
function generateReadMe(processname, processimagepath) {
    let DATA = {
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