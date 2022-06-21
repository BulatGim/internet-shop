
/*export interface IReviews {

}*/

export interface IRate {
    
}

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
    rating: string;
    ratingsNumber: string;
    newPrice: number;
    price: string;
}

export interface IError {
    formInput: string;
    error: string
}