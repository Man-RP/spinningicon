import { WaxJS } from "@waxio/waxjs/dist";
import { ExplorerApi } from "atomicassets";
import { NFT } from "../reducers/NFTsSlice";

export const getAllTemplates = async () => {
  const api = new ExplorerApi(
    "https://wax.api.atomicassets.io",
    "atomicassets",
    {}
  );
  const rawTemplateObject = await api.getTemplates({
    authorized_account: "2fhr.wam",
  });

  let res: NFT[] = [];

  for (let template of rawTemplateObject) {
    res.push({
      templateId: template.template_id.toString(),
      templateName: template.immutable_data.name,
      schemeName: template.schema.schema_name,
      maxSupply: template.max_supply.toString(),
      description: template.immutable_data.hasOwnProperty("description")
        ? template.immutable_data.description
        : "",
      img: template.immutable_data.img,
      mint: undefined,
    });
  }

  return res;
};

export const tryLoginWaxOnSetUp = async () => {
  let wax: WaxJS = new WaxJS("https://wax.greymass.com");
  if (await wax.isAutoLoginAvailable()) {
    return await wax.login();
  }
  return undefined;
};

export const waxLogin = async () => {
  let wax: WaxJS = new WaxJS("https://wax.greymass.com");
  return await wax.login();
};
