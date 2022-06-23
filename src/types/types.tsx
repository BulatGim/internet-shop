
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