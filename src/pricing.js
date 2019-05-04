module.exports = class Pricing { // 3.คำนวณค่าบริการสำหรับการจัดเก็บสินค้าครั้งนั้นๆ ได้

    constructor(param = {}) { // set default
        this.price_per_cm3 = 1; // คิดค่าบริการวันละ 1 บาท ต่อ ปริมาตรกล่อง 1 ลูกบาศก์เซนติเมตร
        this.price_per_kg = 20; // คิดค่าบริการวันละ 20 บาท ต่อ น้ำหนัก 1 กิโลกรัม
        this.price_kg_default = 50; // อาจจะไม่มีข้อมูลน้ำหนักของสินค้า ในกรณีนั้นเพื่อความสะดวก คลังจะคิดค่าบริการวันละ 50 บาท 
        this.price_other = 10; // คิดค่าบริการวันละ 10 บาท ต่อ ปริมาตรกล่อง 1 ลูกบาศก์เมตร
        this.dayms = 86400000; // 1day ms
    };

    supplyfood(width, length, height, import_time, export_time) {
        let cubebaht = width * length * height * this.price_per_cm3; // price per cube
        let dateuse = (export_time - import_time) % this.dayms === 0 ? Math.ceil((export_time - import_time) / this.dayms) + 1 : Math.ceil((export_time - import_time) / this.dayms); // compute date
        let price = (Math.pow(2, dateuse) - 1) * cubebaht; // (2*n - 1) * baht => sum(1,2,4,8,16) * baht
        return price;
    };

    cloth(weight, import_time, export_time) {
        let dateuse = (export_time - import_time) % this.dayms === 0 ? Math.ceil((export_time - import_time) / this.dayms) + 1 : Math.ceil((export_time - import_time) / this.dayms);
        let price = weight ? weight * dateuse * this.price_per_kg : dateuse * this.price_kg_default;
        return price;
    };

    other(width, length, height, import_time, export_time) {
        let cubebaht = width * length * height * this.price_other; // price per cube
        let dateuse = (export_time - import_time) % this.dayms === 0 ? Math.ceil((export_time - import_time) / this.dayms) + 1 : Math.ceil((export_time - import_time) / this.dayms); // compute date
        let price = dateuse * cubebaht;
        return price;
    };

};