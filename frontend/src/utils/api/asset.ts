import { get, post, url } from '@/utils/request';
import { AssetEntity } from '@/interfaces';

export interface Asset {
    address: string | null | undefined;
    name: string;
    slug: string;
}

const assetUrl = (uri: string = '') => {
    return url(`/api/v1/asset${uri}`);
}

export const getAllAsset = async (): Promise<Array<AssetEntity>> => {
    // @ts-ignore
    return await get(assetUrl());
}

export const getAssetBySlug = async (slug: string | string[] | undefined) : Promise<AssetEntity> => {
    // @ts-ignore
    return await get(assetUrl(`/${slug}`));
}

export const createAsset = async(asset: Asset) => {
    return await post(assetUrl(), asset);
}