import { AssetEntity } from './asset';
import { OrderEntity } from './order';

export interface TokenEntity {
  id: string;
  uri: string;
  owner: string;
  asset: AssetEntity;
  orders?: Array<OrderEntity>;
}
