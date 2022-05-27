import { AssetEntity } from '@/interfaces';
import { get, post, serverUrl } from '@/utils/request';

export interface Asset {
  address: string | null | undefined;
  name: string;
  slug: string;
}

const assetUrl = (uri: string = '') => {
  return serverUrl(`/api/v1/asset${uri}`);
};

export const getAllAsset = async (): Promise<Array<AssetEntity>> => {
  // @ts-ignore
  return get(assetUrl());
};

export const getAssetBySlug = async (
  slug: string | string[] | undefined
): Promise<AssetEntity> => {
  // @ts-ignore
  return get(assetUrl(`/${slug}`));
};

export const createAsset = async (asset: Asset) => {
  return post(assetUrl(), asset);
};
