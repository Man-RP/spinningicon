import { NFT } from "../reducers/NFTsSlice";
import { IMints } from "../reducers/userSlice";

export const addUserMintsToNFTs: (NFTs: NFT[], mints: IMints) => NFT[] = (
  NFTs,
  mints
) => {
  const res: NFT[] = [];
  const mintsTemplateIds: string[] = Object.keys(mints);
  for (let NFT of NFTs) {
    let mint: string = "-1";
    const currTemplateId = mintsTemplateIds.find(
      (item) => item === NFT.templateId
    );
    if (currTemplateId) mint = mints[currTemplateId];
    res.push({ ...NFT, mint: mint });
  }
  return res;
};
