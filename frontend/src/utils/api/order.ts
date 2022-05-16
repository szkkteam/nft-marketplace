import { get, post, url } from '@/utils/request';
import { OrderCreate, OrderEntity } from '@/interfaces';

const orderUrl = (uri: string = '') => {
    return url(`/api/v1/order${uri}`);
}

export const createOrder = async (order: OrderCreate): Promise<OrderEntity> => {
    // @ts-ignore
    return await post(orderUrl(), order);
}
