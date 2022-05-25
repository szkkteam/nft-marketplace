import { get, post, serverUrl } from '@/utils/request';
import { MintEntity } from '@/interfaces';

const mintUrl = (uri: string = '') => {
    return serverUrl(`/api/v1/mint${uri}`);
}

export const getAllMint = async (): Promise<Array<MintEntity>> => {
    // @ts-ignore
    return await get(mintUrl());
}

export const getMintBySlug = async (slug: string | string[] | undefined) : Promise<MintEntity> => {
    // @ts-ignore
    return await get(assetUrl(`/${slug}`));
}
