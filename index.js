// index.js
const Mustache = require('mustache');
const BpmnJS = require('bpmn-js');
const jquery = require('jquery');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';

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
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
        if (err) throw err;
        const output = Mustache.render(data.toString(), DATA);
        fs.writeFileSync('README.md', output);
    });
}


// generateReadMe();

const viewer = new BpmnJS();

// attach it to some element
viewer.attachTo('#container');

function renderBpmn() {
    var url = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/url-viewer/resources/pizza-collaboration.bpmn';

    $.jquery.ajax(url, {dataType : 'text'}).done(async function(xml) {

        try {
            await viewer.importXML(xml)
            viewer.get('canvas').zoom('fit-viewport');
        } catch (err) {
            console.error(err);
        }
    });
}

renderBpmn();