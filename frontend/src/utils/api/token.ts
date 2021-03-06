import { TokenEntity } from '@/interfaces';
import { get, serverUrl } from '@/utils/request';

export interface Token {
  address: string | null | undefined;
  name: string;
  slug: string;
}

const tokenUrl = (uri: string = '') => {
  return serverUrl(`/api/v1/assets${uri}`);
};

export const getAllToken = async (
  address: string
): Promise<Array<TokenEntity>> => {
  // @ts-ignore
  return get(tokenUrl(`/${address}`));
};

export const getTokenDetail = async (
  address: string,
  id: string
): Promise<TokenEntity> => {
  // @ts-ignore
  return get(tokenUrl(`/${address}/${id}`));
};

export const getOwnerOf = async (
  address: string,
  id: string
): Promise<string> => {
  // @ts-ignore
  return get(tokenUrl(`/${address}/${id}/owner`));
};
/*
export const getLastValidOrder = async (address: string, id: string): Promise<TokenEntity> => {

} */
