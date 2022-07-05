import {makeAutoObservable} from "mobx";

type filterItem = number[]

interface IActiveFilter {
    typeId: filterItem;
    brandId: filterItem;
}

interface IModal {
    isModalActive: boolean;
    operation: string;
    text: string;
}

class ServiceStore {
    private _overFlowHidden: boolean
    private _activeFilter: IActiveFilter | object
    private _modal: IModal | object

    constructor(){
        this._overFlowHidden=false;
        this._activeFilter={};
        this._modal = {};
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
    setModal(bool:boolean, operation: string | null, text: string | null){
        this._modal ={
            isModalActive: bool,
            operation: operation,
            text: text
        }
        this.setOverFlowHidden(bool)
    }

    get modal(): IModal | object{
        return this._modal;
    }

    get overFlowHidden(): boolean{
        return this._overFlowHidden;
    }

    get activeFilter(): IActiveFilter | object{
        return this._activeFilter;
    }
}
export default ServiceStore;
