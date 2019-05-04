let Datastore = require('../src/datastore');
let datastore = new Datastore({});

let type = 'supplyfood';
let detail = { "width": 1, "height": 1, "length": 1 };
let mockdata = {};

describe(`datastore`, function () {
    describe(`importProduct`, function () {
        it(`importProduct have args { type, detail } should return { type, detail, import_time, _key, status }`, async function () {
            let output = await datastore.importProduct(type, detail);
            mockdata._key = output._key;
            expect(output).to.have.own.property('type').to.equal(type);
            expect(output).to.have.own.property('detail').to.equal(detail);
            expect(output).to.have.own.property('import_time');
            expect(output).to.have.own.property('_key');
            expect(output).to.have.own.property('status').to.equal(0);
            expect(output).to.have.own.property('export_time').to.equal('');
        });
    });

    describe(`exportProduct`, function () {
        it(`exportProduct have args { _key } should return { type, detail, import_time, _key, status, export_time }`, async function () {
            let output = await datastore.exportProduct(mockdata._key);
            expect(output).to.have.own.property('type').to.equal(type);
            expect(output).to.have.own.property('detail');
            expect(output).to.have.own.property('import_time');
            expect(output).to.have.own.property('_key');
            expect(output).to.have.own.property('status').to.equal(1);
            expect(output).to.have.own.property('export_time');
        });
    });
    
    describe(`listProduct`, function () {
        it(`listProduct should return { type, detail, import_time, _key, status, export_time }`, async function () {
            let output = await datastore.listProduct();
            expect(output).each.have.property('type');
            expect(output).each.have.property('detail');
            expect(output).each.have.property('import_time');
            expect(output).each.have.property('_key');
            expect(output).each.have.property('status');
            expect(output).each.have.property('export_time');
        });
    });
});