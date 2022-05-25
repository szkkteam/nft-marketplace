import { get, post, clientUrl } from '@/utils/request';
import { OrderCreate, OrderEntity } from '@/interfaces';

const orderUrl = (uri: string = '', queryParams: object | null = null) => {
    return clientUrl(`/api/v1/order${uri}`, queryParams);
}

export const createOrder = async (order: OrderCreate): Promise<OrderEntity> => {
    // @ts-ignore
    return await post(orderUrl(), order);
}

export const finalizeOrder = async(orderId: string, taker: string): Promise<OrderEntity> => {
    // @ts-ignore
    return await post(orderUrl(`/${orderId}/finalize`), {taker});
}

export const findByFilter = async (address: string, finalized: boolean = false): Promise<OrderEntity[]> => {
    // @ts-ignore
    //return await get(orderUrl(`/filter`, {address, finalized}));
    return await get(orderUrl(`/filter?address=${address}&finalized=${finalized}`));
}

