import {makeAutoObservable} from "mobx";
import {IBasket} from "../types/types";
import {$authHost} from "../http";

class Basket {
    public _userBasket: IBasket| object
    constructor(){
        this._userBasket={};
        makeAutoObservable(this);
    }
    setUserBasket(basket: IBasket){
        this._userBasket = basket;
    }

    async setBasketDevices(){
        const {data} = await $authHost.get('api/basket')
        return this.setUserBasket(data.array)
    }

    get userBasket(): IBasket|object{
        return this._userBasket;
    }
}
export default Basket;