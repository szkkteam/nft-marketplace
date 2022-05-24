
export interface OrderEntity {
    _id: string;
    listingTime: string;
    expirationTime: string;
    currentPrice: string;
    calldata: string;
    v: string;
    r: string;
    s: string;
    salt: string;
    paymentToken: string;
    //token: string;
    //asset: string;
    maker: string;
    taker?: string;
}

export interface OrderCreate extends OrderEntity {
    token: string;
    asset: string;

}