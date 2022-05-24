import { get, post, clientUrl } from '@/utils/request';
import { OrderCreate, OrderEntity } from '@/interfaces';

const orderUrl = (uri: string = '') => {
    return clientUrl(`/api/v1/order${uri}`);
}

export const createOrder = async (order: OrderCreate): Promise<OrderEntity> => {
    // @ts-ignore
    return await post(orderUrl(), order);
}

export const finalizeOrder = async(orderId: string, taker: string): Promise<OrderEntity> => {
    return await post(orderUrl(`/${orderId}/finalize`), {taker});
}