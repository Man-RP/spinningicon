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

export const getTemplateMint: (
  templateId: string,
  mintsObj: IMints
) => string = (templateId, mintsObj) => {
  const userTemplateIds = Object.keys(mintsObj);
  for (let userTemplate of userTemplateIds) {
    if (userTemplate === templateId) return mintsObj[userTemplate];
  }
  return "-1";
};

export const filterNFTsBySchemas: (
  NFTs: NFT[],
  collections: string[] | string
) => NFT[] = (NFTs, schemas) => {
  let res: NFT[] = [];
  res = NFTs.filter((item) => {
    if (Array.isArray(schemas))
      return item.schemeName && schemas.includes(item.schemeName);
    else return item.schemeName === schemas;
  });
  if (res.length < 1) return NFTs;
  return res;
};

export const filterTemplatesByName: (NFTs: NFT[], name: string) => NFT[] = (
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

export const filterNFTsByPage: (
  NFTs: NFT[],
  interval: number,
  page: number
) => NFT[] = (NFTs, interval, page) => NFTs.slice(0, interval * page);

export const checkLastPage: (
  length: number,
  interval: number,
  page: number
) => boolean = (length, interval, page) => {
  return false;
};

export const checkIfLastPage: (
  NFTs: NFT[],
  interval: number,
  page: number,
  search: string,
  schemas: string[]
) => boolean = (NFTs, interval, page, search, schemas) => {
  let templatesArray = NFTs;
  if (search.length > 0)
    templatesArray = filterTemplatesByName(templatesArray, search);
  if (schemas.length > 0)
    templatesArray = filterNFTsBySchemas(templatesArray, schemas);
  if (interval * page >= templatesArray.length) return true;
  return false;
};
