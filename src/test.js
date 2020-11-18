const Helper =  require('./backend/Helper');

main(); async function main() {
    try {
        const filePath = '/home/user/projects/car/apps/site/pages/Car/forms/Car/Controller.js';
        await Helper.writeFile2(filePath, 'abc');
    } catch (err) {
        console.error(err);
    }
}
