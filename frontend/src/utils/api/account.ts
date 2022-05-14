import { get, post, url } from '@/utils/request';

export interface Account {
    address: string | null | undefined;
    proxy: string;
    username?: string;
}

const accountUrl = (uri: string = '') => {
    return url(`/api/v1/account${uri}`);
}

export const getAccount = async (account: string) => {
    return await get(accountUrl(`/${account}`));
}

export const createAccount = async(account: Account) => {
    return await post(accountUrl(), account);
}