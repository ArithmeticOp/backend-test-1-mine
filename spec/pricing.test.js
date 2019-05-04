let Pricing = require('../src/pricing')
let pricing = new Pricing({});

let dayms = 86400000;
let fractimems = 4000;
let import_time = Date.now();

describe(`pricing services`, function () {
    describe(`supplyfood`, function () {
        it(`compute price of supplyfood have args { width = 1, length = 1, height = 1, import_time = now, export_time = now } should return 1 baht`, function () {
            let supplyfood_price = pricing.supplyfood(1, 1, 1, import_time, import_time);
            expect(supplyfood_price).to.equal(1);
        });

        it(`compute price of supplyfood have args { width = 1, length = 1, height = 2, import_time = now, export_time = now } should return 2 baht`, function () {
            let supplyfood_price = pricing.supplyfood(1, 1, 2, import_time, import_time);
            expect(supplyfood_price).to.equal(2);
        });

        it(`compute price of supplyfood have args { width = 2, length = 2, height = 2, import_time = now, export_time = now } should return 8 baht`, function () {
            let supplyfood_price = pricing.supplyfood(2, 2, 2, import_time, import_time);
            expect(supplyfood_price).to.equal(8);
        });

        it(`compute price of supplyfood have args { width = 1, length = 1, height = 1, import_time = now, export_time = now + 1 day } should return 3 baht`, function () {
            let supplyfood_price = pricing.supplyfood(1, 1, 1, import_time, import_time + dayms);
            expect(supplyfood_price).to.equal(3);
        });

        it(`compute price of supplyfood have args { width = 1, length = 2, height = 3, import_time = now, export_time = now + 1 day } should return 18 baht`, function () {
            let supplyfood_price = pricing.supplyfood(1, 2, 3, import_time, import_time + dayms);
            expect(supplyfood_price).to.equal(18);
        });

        it(`compute price of supplyfood have args { width = 1, length = 2, height = 3, import_time = now, export_time = now + 2 day } should return 42 baht`, function () {
            let supplyfood_price = pricing.supplyfood(1, 2, 3, import_time, import_time + (dayms * 2));
            expect(supplyfood_price).to.equal(42);
        });

        it(`compute price of supplyfood have args { width = 1, length = 2, height = 3, import_time = now, export_time = now + 2 day + fractimems } should return 42 baht`, function () {
            let supplyfood_price = pricing.supplyfood(1, 2, 3, import_time, import_time + (dayms * 2) + fractimems);
            expect(supplyfood_price).to.equal(42);
        });
    });

    describe(`cloth`, function () {
        it(`compute price of cloth have args { weight = 1, import_time = now, export_time = now } should return 20 baht`, function () {
            let cloth_price = pricing.cloth(1, import_time, import_time);
            expect(cloth_price).to.equal(20);
        });

        it(`compute price of cloth have args { weight = null, import_time = now, export_time = now } should return 50 baht`, function () {
            let cloth_price = pricing.cloth(null, import_time, import_time);
            expect(cloth_price).to.equal(50);
        });

        it(`compute price of cloth have args { weight = 5, import_time = now, export_time = now } should return 100 baht`, function () {
            let cloth_price = pricing.cloth(5, import_time, import_time);
            expect(cloth_price).to.equal(100);
        });

        it(`compute price of cloth have args { weight = 1, import_time = now, export_time = now + 1 day } should return 40 baht`, function () {
            let cloth_price = pricing.cloth(1, import_time, import_time + dayms);
            expect(cloth_price).to.equal(40);
        });

        it(`compute price of cloth have args { weight = 5, import_time = now, export_time = now + 1 day } should return 200 baht`, function () {
            let cloth_price = pricing.cloth(5, import_time, import_time + dayms);
            expect(cloth_price).to.equal(200);
        });

        it(`compute price of cloth have args { weight = 5, import_time = now, export_time = now + 2 day } should return 300 baht`, function () {
            let cloth_price = pricing.cloth(5, import_time, import_time + (dayms * 2));
            expect(cloth_price).to.equal(300);
        });

        it(`compute price of cloth have args { weight = 5, import_time = now, export_time = now + 2 day + fractimems } should return 300 baht`, function () {
            let cloth_price = pricing.cloth(5, import_time, import_time + (dayms * 2) + fractimems);
            expect(cloth_price).to.equal(300);
        });
    });

    describe(`other`, function () {
        it(`compute price of other have args { width = 1, length = 1, height = 1, import_time = now, export_time = now } should return 10 baht`, function () {
            let other_price = pricing.other(1, 1, 1, import_time, import_time);
            expect(other_price).to.equal(10);
        });

        it(`compute price of other have args { width = 1, length = 1, height = 2, import_time = now, export_time = now } should return 20 baht`, function () {
            let other_price = pricing.other(1, 1, 2, import_time, import_time);
            expect(other_price).to.equal(20);
        });

        it(`compute price of other have args { width = 2, length = 2, height = 2, import_time = now, export_time = now } should return 80 baht`, function () {
            let other_price = pricing.other(2, 2, 2, import_time, import_time);
            expect(other_price).to.equal(80);
        });

        it(`compute price of other have args { width = 1, length = 1, height = 1, import_time = now, export_time = now + 1 day } should return 20 baht`, function () {
            let other_price = pricing.other(1, 1, 1, import_time, import_time + dayms);
            expect(other_price).to.equal(20);
        });

        it(`compute price of other have args { width = 1, length = 2, height = 3, import_time = now, export_time = now + 1 day } should return 120 baht`, function () {
            let other_price = pricing.other(1, 2, 3, import_time, import_time + dayms);
            expect(other_price).to.equal(120);
        });

        it(`compute price of other have args { width = 1, length = 2, height = 3, import_time = now, export_time = now + 2 day } should return 180 baht`, function () {
            let other_price = pricing.other(1, 2, 3, import_time, import_time + (dayms * 2));
            expect(other_price).to.equal(180);
        });

        it(`compute price of other have args { width = 1, length = 2, height = 3, import_time = now, export_time = now + 2 day + fractimems } should return 180 baht`, function () {
            let other_price = pricing.other(1, 2, 3, import_time, import_time + (dayms * 2) + fractimems);
            expect(other_price).to.equal(180);
        });
    });
});