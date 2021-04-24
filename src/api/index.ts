import { ExplorerApi, RpcApi } from "atomicassets";

export const getAllTemplates = async () => {
  const api = new ExplorerApi(
    "https://wax.api.atomicassets.io",
    "atomicassets",
    {}
  );
  const rawTemplateObject = await api.getTemplates({
    authorized_account: "2fhr.wam",
  });
  console.log(rawTemplateObject);

  return {};
};
