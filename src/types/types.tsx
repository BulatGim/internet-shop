
export interface IReview {
    id: number;
    rate: string;
    advantages: string;
    disadvantages: string;
    comment: string;
    createdAt: string;
    deviceId: number;
    devicePrevieew: string;
    deviceTitle: string;
    userId: number;
    userName: string;
}

export interface IDeviceCard {
    id: number;
    img: string;
    name: string;
    rating: number;
    ratingsNumber: number;
    newPrice: number;
    price: number;
    amount: number;
    brandId:number;
    typeId:number;
    createdAt: string;
    updatedAt: string;
    device_colors?: IDeviceColor[];
}

export interface IDeviceColor {
    id:number;
    color:string;
    updatedAt:string;
    createdAt:string;
}

export interface ICountedDevices {
    count:number;
    rows:IDeviceCard[];
}

export interface IError {
    formInput: string;
    error: string
}

export interface IBasket {
    id: number;
    createdAt: string;
    updatedAt: string;
    basketId: number;
    deviceId: number;
}

export interface IFormValues {
    name?: string;
    surname?: string;
    patronymic?: string;
    email?: string;
    birthday?: string;
    phone?: string;
    password?: string;
    repeatPassword?: string;
    comment?: string;
}

export interface IPrevOrderDevices {
    createdAt: string;
    deviceId:number;
    id:number;
    orderId: number;
    updatedAt: string;
    device: IDeviceCard;
}

export interface IPrevOrder {
    order: IPrevOrderDevices[]
}

export interface IDialog {
    addressee:string|null;
    addresseePhoto?:string;
    createdAt:string;
    id:number;
    lasMessageDate:string;
    lastMessage:string;
    title:string;
    updatedAt:string;
    userId:number;
}

export interface IUserError {
    formInput:string;
    error: string;
}

export interface ITypes {
    id:number;
    createdAt: string;
    updatedAt:string;
    name:string;
}