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

export const getTemplateMint: (templateId: string, mintsObj: IMints) => string =
  (templateId, mintsObj) => {
    const userTemplateIds = Object.keys(mintsObj);
    for (let userTemplate of userTemplateIds) {
      if (userTemplate === templateId) return mintsObj[userTemplate];
    }
    return "-1";
  };

export const filterNFTsByCollection: (
  NFTs: NFT[],
  collections: string[] | string
) => NFT[] = (NFTs, collections) => {
  let res: NFT[] = [];
  res = NFTs.filter((item) => {
    if (Array.isArray(collections))
      return item.collectionName && collections.includes(item.collectionName);
    else return item.collectionName === collections;
  });
  if (res.length < 1) return NFTs;
  return res;
};

export const filterNFTsByTemplateName: (NFTs: NFT[], name: string) => NFT[] = (
  NFTs,
  name
) => {
  let res: NFT[] = [];
  if (name.length < 1) res = NFTs;
  else
    res = NFTs.filter((item) =>
      item.templateName.toLowerCase().includes(name.toLowerCase())
    );
  return res;
};
