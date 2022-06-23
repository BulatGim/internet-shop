import {makeAutoObservable} from "mobx";
import {IBasket} from "../types/types";

class Basket {
    public _userBasket: IBasket| object
    constructor(){
        this._userBasket={};
        makeAutoObservable(this);
    }
    setUserBasket(basket: IBasket){
        this._userBasket = basket;
    }
    get userBasket(): IBasket|object{
        return this._userBasket;
    }
}
export default Basket;