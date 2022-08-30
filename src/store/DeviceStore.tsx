import { makeAutoObservable } from "mobx";
import {IDeviceCard, ITypes} from "../types/types";

export default class DeviceStore {

    private _types:ITypes[];

    private _brands: ITypes[];

    private _devices: IDeviceCard[]

    constructor(){
        this._types = [];
        this._brands = [];
        this._devices = []
        makeAutoObservable(this);
    }
    setTypes(types: ITypes[]){
        this._types = types;
    }
    setBrands(brands: ITypes[]){
        this._brands = brands;
    }
    setDevices(devices: IDeviceCard[]){
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