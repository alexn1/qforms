const Helper =  require('../dist/lib/backend/Helper');

function templateToJsString(value, params) {
    return value.replace(/\$\{([\w\.@]+)\}/g, (text, name) => {
        if (params.hasOwnProperty(name)) {
            return `Helper.decodeValue('${Helper.encodeValue(params[name])}')`;
        }
        return 'undefined';
    });
}

main(); async function main() {
    /*try {
        const filePath = '/home/user/projects/car/apps/site/pages/Car/forms/Car/Controller.js';
        await Helper.writeFile2(filePath, 'abc');
    } catch (err) {
        console.error(err);
    }*/
    const js = templateToJsString('${abc} + ${xyz}', {abc: 5, xyz: 6});
    console.log('js:', js);
    console.log('value:', eval(js));





}
