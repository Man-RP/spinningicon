import { WaxJS } from "@waxio/waxjs/dist";
import { ExplorerApi } from "atomicassets";
import { NFT } from "../reducers/NFTsSlice";
import { IMints } from "../reducers/userSlice";

export const getAllTemplates = async () => {
  const api = new ExplorerApi(
    "https://wax.api.atomicassets.io",
    "atomicassets",
    {}
  );
  const rawTemplateObject = await api.getTemplates({
    collection_name: "spinningicon",
  });

  let res: NFT[] = [];

  for (let template of rawTemplateObject) {
    res.push({
      templateId: template.template_id.toString(),
      templateName: template.immutable_data.name,
      collectionName: template.collection.name,
      schemeName: template.schema.schema_name,
      maxSupply: template.max_supply.toString(),
      description: template.immutable_data.hasOwnProperty("Description")
        ? template.immutable_data.Description
        : "",
      img: template.immutable_data.img,
    });
  }
  return res;
};

export const getTemplatesByPage = async (page: number) => {
  const api = new ExplorerApi(
    "https://wax.api.atomicassets.io",
    "atomicassets",
    {}
  );
  const rawTemplateObject = await api.getTemplates({
    collection_name: "spinningicon",
    limit: 9,
    page: page + 1,
  });

  let res: NFT[] = [];

  for (let template of rawTemplateObject) {
    res.push({
      templateId: template.template_id.toString(),
      templateName: template.immutable_data.name,
      collectionName: template.collection.name,
      schemeName: template.schema.schema_name,
      maxSupply: template.max_supply.toString(),
      description: template.immutable_data.hasOwnProperty("Description")
        ? template.immutable_data.Description
        : "",
      img: template.immutable_data.img,
    });
  }
  return res;
};

export const tryLoginWaxOnSetUp = async () => {
  let wax: WaxJS = new WaxJS(
    "https://wax.greymass.com",
    undefined,
    undefined,
    false
  );
  if (await wax.isAutoLoginAvailable()) {
    return (await wax.login()) as string;
  }
  return undefined;
};

export const waxLogin = async () => {
  let wax: WaxJS = new WaxJS(
    "https://wax.greymass.com",
    undefined,
    undefined,
    false
  );
  return (await wax.login()) as string;
};

export const getUserMints = async (userName: string) => {
  const res: IMints = {};
  const api = new ExplorerApi(
    "https://wax.api.atomicassets.io",
    "atomicassets",
    {}
  );

  const rawAssetsObject = await api.getAssets({
    owner: userName,
  });

  for (let asset of rawAssetsObject) {
    const templateId = asset.template?.template_id;
    const mintNumber = asset.template?.issued_supply;
    if (typeof templateId === "string" && typeof mintNumber === "string")
      res[templateId] = mintNumber;
  }

  return res;
};

export const getAllSchemas = async () => {
  const res: string[] = [];
  const api = new ExplorerApi(
    "https://wax.api.atomicassets.io",
    "atomicassets",
    {}
  );

  const rawTemplateObject = await api.getSchemas({
    collection_name: "spinningicon",
  });

  rawTemplateObject.forEach((item) => res.push(item.schema_name));

  return res;
};
