let fs = require('fs');

module.exports = class Datastore {
    constructor(param = {}) {

    };

    importProduct(type, detail) { // 1.รับเข้าสินค้าได้เป็นกล่อง
        return new Promise((resolve) => {
            let documents = {
                type,
                detail,
                import_time: Date.now(),
                _key: Math.random().toString(18).substring(2),
                export_time: '',
                status: 0
            };
            fs.readFile('src/database.json', 'utf8', async function readFileCallback(err, data) {
                if (err) resolve(null);
                else {
                    if (data) {
                        let obj = JSON.parse(data); //now it an object
                        obj.data.push(documents); //add some data
                        let json = JSON.stringify(obj); //convert it back to json
                        fs.writeFile('src/database.json', json, (err) => {
                            if (err) resolve(null);
                            resolve(documents);
                        });
                    }
                    else {
                        let obj = { data: [] };
                        obj.data.push(documents); //add some data
                        let json = JSON.stringify(obj); //convert it back to json
                        fs.writeFile('src/database.json', json, (err) => {
                            if (err) resolve(null);
                            resolve(documents);
                        });
                    }
                }
            });
        });
    };

    exportProduct(key) { // 2.นำสินค้าออกได้เป็นกล่อง
        return new Promise((resolve) => {
            fs.readFile('src/database.json', 'utf8', async function readFileCallback(err, output) {
                if (err) resolve(null);
                else {
                    if (output) {
                        let json = JSON.parse(output);
                        let { data } = json;
                        for (let i in data) {
                            if (data[i]._key === key) {
                                data[i].status = 1;
                                data[i].export_time = Date.now();
                                fs.writeFile('src/database.json', JSON.stringify(json), (err) => {
                                    if (err) resolve(null);
                                    resolve(data[i]);
                                });
                            }
                        }
                        // resolve(null);
                    }
                    else resolve(null);
                }
            });
        });
    };

    listProduct() { // 4.ดูรายละเอียดสินค้าต่างๆ ที่อยู่ในคลังได้
        return new Promise((resolve) => {
            fs.readFile('src/database.json', 'utf8', async function readFileCallback(err, output) {
                if (err) resolve(null);
                else {
                    if (output) {
                        resolve(JSON.parse(output).data);
                    }
                    else resolve(null);
                }
            });
        });
    };

    billing() { // 5.ดูข้อมูลรายละเอียดผลประกอบการทั้งหมดได้
        return new Promise((resolve) => {
            fs.readFile('src/database.json', 'utf8', async function readFileCallback(err, output) {
                if (err) resolve(null);
                else {
                    if (output) {
                        let json = JSON.parse(output);
                        let { data } = json;
                        let bill = [];
                        for (let i in data) {
                            if (data[i].status === 1) {
                                bill.push(data[i]);
                            }
                        }
                        resolve(bill);
                    }
                    else resolve(null);
                }
            });
        });
    };

    recordPrice(key, price) {
        return new Promise((resolve) => {
            fs.readFile('src/database.json', 'utf8', async function readFileCallback(err, output) {
                if (err) resolve(null);
                else {
                    if (output) {
                        let json = JSON.parse(output);
                        let { data } = json;
                        for (let i in data) {
                            if (data[i]._key === key) {
                                data[i].price = price;
                                fs.writeFile('src/database.json', JSON.stringify(json), (err) => {
                                    if (err) resolve(null);
                                    resolve(data[i]);
                                });
                            }
                        }
                        // resolve(null);
                    }
                    else resolve(null);
                }
            });
        });
    };
};