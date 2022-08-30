import {makeAutoObservable} from "mobx";
import { IPrevOrder} from "../types/types";


class PreviousOrdersStore {
    private _previousOrders: Array<IPrevOrder[]>| [];
    constructor(){
        this._previousOrders=[];
        makeAutoObservable(this);
    }
    setPreviousOrders=(orders: Array<IPrevOrder[]>)=>{
        this._previousOrders = orders;
    }
    get PreviousOrders(): Array<IPrevOrder[]>|[]{
        return this._previousOrders;
    }
}
export default PreviousOrdersStore;