import {makeAutoObservable} from "mobx";

type filterItem = number[]

interface IActiveFilter {
    typeId: filterItem;
    brandId: filterItem;
}

class ServiceStore {
    private _overFlowHidden: boolean
    private _activeFilter: IActiveFilter | object
    constructor(){
        this._overFlowHidden=false;
        this._activeFilter={}
        makeAutoObservable(this);
    }
    setOverFlowHidden(bool: boolean){
        this._overFlowHidden = bool;
    }
    setActiveFilter(filter: filterItem, filterName: string){
        this._activeFilter = {
            ...this.activeFilter,
            [filterName]: [...filter]
        };
    }
    get overFlowHidden(): boolean{
        return this._overFlowHidden;
    }

    get activeFilter(): IActiveFilter | object{
        return this._activeFilter;
    }
}
export default ServiceStore;
