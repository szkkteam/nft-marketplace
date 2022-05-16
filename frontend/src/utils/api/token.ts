import { get, post, url } from '@/utils/request';
import { TokenEntity } from '@/interfaces';

export interface Token {
    address: string | null | undefined;
    name: string;
    slug: string;
}

const tokenUrl = (uri: string = '') => {
    return url(`/api/v1/assets${uri}`);
}

export const getAllToken = async (address: string): Promise<Array<TokenEntity>> => {
    // @ts-ignore
    return await get(tokenUrl(`/${address}`));
}
