import { useCallback } from 'react';
import { getApproved, setApprovalForAll, isApprovedForAll } from '@/utils/calls/IERC721';
import { useIERC721 as IERC721 } from '@/hooks/useContract';

const useIERC721 = (address: string) => {
  const contract = IERC721(address);

  const handleGetApproved = useCallback(
    async (tokenId: string | null | undefined) => {
      return await getApproved(contract, tokenId);
    },
    [contract],
  );

  const handleIsApprovedForAll = useCallback(
    async (address: string | null | undefined, operator: string | null | undefined) => {
      return await isApprovedForAll(contract, address, operator);
    },
    [contract],
  );

  const handleSetApprovalForAll = useCallback(
    async (operator: string, approved: boolean) => {
        console.log("Things")
        const txHash = await setApprovalForAll(contract, operator, approved);
        console.info(txHash);
    },
        [contract],
  );

  return { 
      getApproved: handleGetApproved,
      setApprovalForAll: handleSetApprovalForAll, 
      isApprovedForAll: handleIsApprovedForAll
    };
};

export default useIERC721;