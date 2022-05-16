
export interface OrderEntity {
    listingTime: string;
    expirationTime: string;
    currentPrice: string;
    calldata: string;
    salt: string;
    paymentToken: string;
    //token: string;
    //asset: string;
    maker: string;
    taker?: string;
}

export interface OrderCreate {
    listingTime: string;
    expirationTime: string;
    currentPrice: string;
    calldata: string;
    salt: string;
    paymentToken: string;
    token: string;
    asset: string;
    maker: string;

}