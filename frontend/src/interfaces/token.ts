import { OrderEntity } from "./order";
import { AssetEntity } from "./asset";

export interface TokenEntity {
    id: string;
    uri: string;
    owner: string;
    asset: AssetEntity;
    orders?: Array<OrderEntity>;
}