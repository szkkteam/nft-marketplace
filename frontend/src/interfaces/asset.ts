import { TokenEntity } from './token';

export interface AssetEntity {
  address: string | null | undefined;
  slug: string;
  name: string;
}

export interface AssetDetail {
  tokens?: Array<TokenEntity>;
  asset: AssetEntity;
}
