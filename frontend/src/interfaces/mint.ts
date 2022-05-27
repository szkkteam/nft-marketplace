export interface MintEntity {
  address: string | null | undefined;
  slug: string;
  name: string;
  supply?: {
    totalSupply: string;
    maximumSupply: string;
  };
}
