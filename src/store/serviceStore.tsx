import {makeAutoObservable} from "mobx";
import {IModal, IActiveFilter} from "../types/types";


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
    setActiveFilter(filter: number[], filterName: string){
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
