import { MintEntity } from '@/interfaces';
import { get, serverUrl } from '@/utils/request';

const mintUrl = (uri: string = '') => {
  return serverUrl(`/api/v1/mint${uri}`);
};

export const getAllMint = async (): Promise<Array<MintEntity>> => {
  // @ts-ignore
  return get(mintUrl());
};

export const getMintBySlug = async (
  slug: string | string[] | undefined
): Promise<MintEntity> => {
  // @ts-ignore
  return get(assetUrl(`/${slug}`));
};
