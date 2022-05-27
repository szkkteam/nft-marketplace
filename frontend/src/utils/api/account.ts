import { clientUrl, get, post } from '@/utils/request';

export interface Account {
  address: string | null | undefined;
  proxy: string;
  username?: string;
}

const accountUrl = (uri: string = '') => {
  return clientUrl(`/api/v1/account${uri}`);
};

export const getAccount = async (account: string) => {
  return get(accountUrl(`/${account}`));
};

export const createAccount = async (account: Account) => {
  return post(accountUrl(), account);
};
