let Datastore = require('./datastore');
let datastore = new Datastore({});
let Pricing = require('./pricing');
let pricing = new Pricing({});

exports.importProduct = async function (req, res) {
    let { type, detail } = req.body;
    let data = validatedata(type, detail);
    if (data) res.send(await datastore.importProduct(data.type, data.detail));
    else res.send(null);
};

exports.exportProduct = async function (req, res) {
    let { _key } = req.body;
    if (_key) {
        let productinfo = await datastore.exportProduct(_key);
        let price = calpricing(productinfo.type, productinfo.detail, productinfo.import_time, productinfo.export_time);
        productinfo.price = price;
        res.send(productinfo);
    }
    else res.send(null);
};

exports.listProduct = async function (req, res) {
    res.send(await datastore.listProduct());
};

exports.billing = function (req, res) {

};

function validatedata(type, detail) {
    if (detail && type) {
        switch (type) {
            case 'supplyfood':
                if (detail.width && detail.length && detail.height) return { type, detail };
                else return null;
            case 'cloth':
                if (detail.weight) return { type, detail };
                else return null;
            default:
                if (detail.width && detail.length && detail.height) return { type, detail };
                else return null;
        }
    }
    return null;
}

function calpricing(type, detail, import_time, export_time) {
    switch (type) {
        case 'supplyfood':
            return pricing.supplyfood(detail.width, detail.length, detail.height, import_time, export_time);
        case 'cloth':
            return pricing.cloth(detail.weight, import_time, export_time);
        default:
            return pricing.other(detail.width, detail.length, detail.height, import_time, export_time);
    }
}