import { useCallback } from 'react';

import { useIERC721 as IERC721 } from '@/hooks/useContract';
import {
  getApproved,
  isApprovedForAll,
  setApprovalForAll,
  totalSupply,
} from '@/utils/calls/IERC721';

const useIERC721 = (address: string) => {
  const contract = IERC721(address);

  const handleGetApproved = useCallback(
    async (tokenId: string | null | undefined) => {
      // @ts-ignore
      return getApproved(contract, tokenId);
    },
    [contract]
  );

  const handleIsApprovedForAll = useCallback(
    async (
      address: string | null | undefined,
      operator: string | null | undefined
    ) => {
      // @ts-ignore
      return isApprovedForAll(contract, address, operator);
    },
    [contract]
  );

  const handleSetApprovalForAll = useCallback(
    async (operator: string, approved: boolean) => {
      // @ts-ignore
      const txHash = await setApprovalForAll(contract, operator, approved);
      console.info(txHash);
    },
    [contract]
  );

  const handleTotalSupply = useCallback(async () => {
    // @ts-ignore
    return totalSupply(contract);
  }, [contract]);

  return {
    getApproved: handleGetApproved,
    setApprovalForAll: handleSetApprovalForAll,
    isApprovedForAll: handleIsApprovedForAll,
    totalSupply: handleTotalSupply,
  };
};

export default useIERC721;
