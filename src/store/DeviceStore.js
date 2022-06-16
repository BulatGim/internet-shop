import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor(){
        this._types = [{id:1, name: "Холодильники"},{id:2, name: "Смартфоны"},{id:3, name: "Микроволновки"},];
        this._brands = [{id:1, name: "Iphone"},{id:2, name: "Samsung"},{id:3, name: "Xiaomi"}];
        this._devices = [{id:1, name: "12", price: 10000, rating : 4, typeId: 2, brandId: 1},{id:2, name: "13", price: 100000, rating : 0, typeId: 2, brandId: 1}, {id:3, name: "A13", price: 50000, rating : 3, typeId: 2, brandId: 2}, {id:4, name: "Note4", price: 5000, rating : 2, typeId: 2, brandId: 3}]
        makeAutoObservable(this);
    }
    setTypes(types){
        this._types = types;
    }
    setBrands(brands){
        this._brands = brands;
    }
    setDevices(devices){
        this._devices = devices;
    }
    get types(){
        return this._types;
    }
    get brands(){
        return this._brands;
    }
    get devices(){
        return this._devices;
    }
}