
/*export interface IReviews {

}*/

export interface IRate {
    
}

export interface IReview {
    id: Number;
    rate: String;
    advantages: String;
    disadvantages: String;
    comment: String;
    createdAt: String;
    deviceId: Number;
    devicePrevieew: String;
    deviceTitle: String;
    userId: Number;
    userName: String;
}

export interface IDeviceCard {
    img: String;
    name: String;
    rating: String;
    ratingsNumber: String;
    newPrice: String;
    price: String;
}