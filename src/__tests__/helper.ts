import {
  addUserMintsToNFTs,
  filterNFTsBySchemas,
  filterTemplatesByName,
  getTemplateMint,
  checkIfLastPage,
  filterNFTsByPage,
} from "../helper";
import { NFT } from "../reducers/NFTsSlice";
import { IMints } from "../reducers/userSlice";

it("add mints to each NFT data", () => {
  const dummyNoMintsNFTS: NFT[] = [
    {
      templateId: "45645134325",
      templateName: "dummy name",
      schemeName: "dummy scheme",
      collectionName: "dummy collection",
      description: "hdfhsd",
      img: "",
      maxSupply: "4540",
    },
    {
      templateId: "4134546352",
      templateName: "dummy name2",
      schemeName: "dummy scheme2",
      collectionName: "dummy collection",
      description: "fggf",
      img: "",
      maxSupply: "4040",
    },
    {
      templateId: "4134542635",
      templateName: "dummy name3",
      schemeName: "dummy scheme3",
      collectionName: "dummy collection",
      description: "fggdaf",
      img: "",
      maxSupply: "4041",
    },
  ];
  const dummyMints: IMints = {
    4134542635: "210",
    4134546352: "350",
  };

  expect(addUserMintsToNFTs(dummyNoMintsNFTS, dummyMints)).toContainEqual({
    templateId: "4134546352",
    templateName: "dummy name2",
    schemeName: "dummy scheme2",
    collectionName: "dummy collection",
    description: "fggf",
    img: "",
    maxSupply: "4040",
    mint: "350",
  });
  expect(addUserMintsToNFTs(dummyNoMintsNFTS, dummyMints)).toContainEqual({
    templateId: "4134542635",
    templateName: "dummy name3",
    collectionName: "dummy collection",
    schemeName: "dummy scheme3",
    description: "fggdaf",
    img: "",
    maxSupply: "4041",
    mint: "210",
  });
  expect(addUserMintsToNFTs(dummyNoMintsNFTS, dummyMints)).toContainEqual({
    templateId: "45645134325",
    templateName: "dummy name",
    schemeName: "dummy scheme",
    collectionName: "dummy collection",
    description: "hdfhsd",
    img: "",
    maxSupply: "4540",
    mint: "-1",
  });
});

it("returns mint number of user asset by template id", () => {
  expect(getTemplateMint("1111", { 1111: "214", 1221: "2342" })).toMatch(/214/);
  expect(getTemplateMint("1221", { 1111: "214", 1221: "2342" })).toMatch(
    /2342/
  );
  expect(getTemplateMint("1112", { 1111: "214", 1221: "2342" })).toMatch(/-1/);
  expect(getTemplateMint("1112", {})).toMatch(/-1/);
  expect(getTemplateMint("", { 1111: "214", 1221: "2342" })).toMatch(/-1/);
});

it("filter NFT array by collections", () => {
  const schemas = ["harta", "barta"];

  const dummyNoMintsNFTS: NFT[] = [
    {
      templateId: "45645134325",
      templateName: "dummy name",
      collectionName: "dummy collection",
      description: "hdfhsd",
      img: "",
      maxSupply: "4540",
      schemeName: "harta",
    },
    {
      templateId: "4134546352",
      templateName: "dummy name2",
      collectionName: "dummy collection",
      description: "fggf",
      img: "",
      maxSupply: "4040",
      schemeName: "barta",
    },
    {
      templateId: "4134542635",
      templateName: "dummy name3",
      collectionName: "dummy collection",
      schemeName: "dummy scheme",
      description: "fggdaf",
      img: "",
      maxSupply: "4041",
    },
  ];

  expect(filterNFTsBySchemas(dummyNoMintsNFTS, schemas)).toContainEqual({
    templateId: "45645134325",
    templateName: "dummy name",
    collectionName: "dummy collection",
    description: "hdfhsd",
    img: "",
    maxSupply: "4540",
    schemeName: "harta",
  });

  expect(filterNFTsBySchemas(dummyNoMintsNFTS, schemas)).toContainEqual({
    templateId: "4134546352",
    templateName: "dummy name2",
    collectionName: "dummy collection",
    description: "fggf",
    img: "",
    maxSupply: "4040",
    schemeName: "barta",
  });

  expect(filterNFTsBySchemas(dummyNoMintsNFTS, schemas)).not.toContainEqual({
    templateId: "4134542635",
    templateName: "dummy name3",
    collectionName: "dummy collection",
    schemeName: "dummy scheme",
    description: "fggdaf",
    img: "",
    maxSupply: "4041",
  });

  expect(filterNFTsBySchemas(dummyNoMintsNFTS, "harta")).toContainEqual({
    templateId: "45645134325",
    templateName: "dummy name",
    collectionName: "dummy collection",
    description: "hdfhsd",
    img: "",
    maxSupply: "4540",
    schemeName: "harta",
  });

  expect(filterNFTsBySchemas(dummyNoMintsNFTS, "")).toContainEqual({
    templateId: "4134542635",
    templateName: "dummy name3",
    collectionName: "dummy collection",
    schemeName: "dummy scheme",
    description: "fggdaf",
    img: "",
    maxSupply: "4041",
  });
});

it("filter NFT array by name", () => {
  const dummyNoMintsNFTS: NFT[] = [
    {
      templateId: "45645134325",
      templateName: "dummy name",
      schemeName: "dummy scheme",
      description: "hdfhsd",
      img: "",
      maxSupply: "4540",
      collectionName: "harta",
    },
    {
      templateId: "4134546352",
      templateName: "dummy name2",
      schemeName: "dummy scheme2",
      description: "fggf",
      img: "",
      maxSupply: "4040",
      collectionName: "barta",
    },
    {
      templateId: "4134542635",
      templateName: "dummy name3",
      schemeName: "dummy scheme3",
      description: "fggdaf",
      img: "",
      collectionName: "dummy collection",
      maxSupply: "4041",
    },
  ];

  expect(filterTemplatesByName(dummyNoMintsNFTS, "dummy name3")).toContainEqual(
    {
      templateId: "4134542635",
      templateName: "dummy name3",
      schemeName: "dummy scheme3",
      description: "fggdaf",
      collectionName: "dummy collection",
      img: "",
      maxSupply: "4041",
    }
  );

  expect(
    filterTemplatesByName(dummyNoMintsNFTS, "dummy name3")
  ).not.toContainEqual({
    templateId: "4134546352",
    templateName: "dummy name2",
    schemeName: "dummy scheme2",
    description: "fggf",
    img: "",
    maxSupply: "4040",
    collection: "barta",
  });

  expect(filterTemplatesByName(dummyNoMintsNFTS, "dummy")).toContainEqual({
    templateId: "4134542635",
    templateName: "dummy name3",
    schemeName: "dummy scheme3",
    description: "fggdaf",
    img: "",
    collectionName: "dummy collection",
    maxSupply: "4041",
  });
});

it("filter NFT by page", () => {
  const dummyNoMintsNFTS: NFT[] = [
    {
      templateId: "1",
      templateName: "dummy name",
      schemeName: "dummy scheme",
      description: "hdfhsd",
      img: "",
      maxSupply: "4540",
      collectionName: "harta",
    },
    {
      templateId: "2",
      templateName: "dummy name2",
      schemeName: "dummy scheme2",
      description: "fggf",
      img: "",
      maxSupply: "4040",
      collectionName: "barta",
    },
    {
      templateId: "3",
      templateName: "dummy name3",
      schemeName: "dummy scheme3",
      description: "fggdaf",
      img: "",
      collectionName: "dummy collection",
      maxSupply: "4041",
    },
    {
      templateId: "4",
      templateName: "dummy name3",
      schemeName: "dummy scheme3",
      description: "fggdaf",
      img: "",
      collectionName: "dummy collection",
      maxSupply: "4041",
    },
    {
      templateId: "5",
      templateName: "dummy name3",
      schemeName: "dummy scheme3",
      description: "fggdaf",
      img: "",
      collectionName: "dummy collection",
      maxSupply: "4041",
    },
    {
      templateId: "6",
      templateName: "dummy name3",
      schemeName: "dummy scheme3",
      description: "fggdaf",
      img: "",
      collectionName: "dummy collection",
      maxSupply: "4041",
    },
  ];

  expect(filterNFTsByPage(dummyNoMintsNFTS, 2, 1)).toContainEqual({
    templateId: "1",
    templateName: "dummy name",
    schemeName: "dummy scheme",
    description: "hdfhsd",
    img: "",
    maxSupply: "4540",
    collectionName: "harta",
  });
  expect(filterNFTsByPage(dummyNoMintsNFTS, 2, 1)).toContainEqual({
    templateId: "2",
    templateName: "dummy name2",
    schemeName: "dummy scheme2",
    description: "fggf",
    img: "",
    maxSupply: "4040",
    collectionName: "barta",
  });
  expect(filterNFTsByPage(dummyNoMintsNFTS, 2, 1)).not.toContainEqual({
    templateId: "4",
    templateName: "dummy name3",
    schemeName: "dummy scheme3",
    description: "fggdaf",
    img: "",
    collectionName: "dummy collection",
    maxSupply: "4041",
  });
  expect(filterNFTsByPage(dummyNoMintsNFTS, 2, 2)).toContainEqual({
    templateId: "4",
    templateName: "dummy name3",
    schemeName: "dummy scheme3",
    description: "fggdaf",
    img: "",
    collectionName: "dummy collection",
    maxSupply: "4041",
  });
  expect(filterNFTsByPage(dummyNoMintsNFTS, 2, 2)).toContainEqual({
    templateId: "4",
    templateName: "dummy name3",
    schemeName: "dummy scheme3",
    description: "fggdaf",
    img: "",
    collectionName: "dummy collection",
    maxSupply: "4041",
  });
});

it("checking if last page", () => {
  const dummyArray: NFT[] = Array.from(Array(20), (x, index) => ({
    templateId: index.toString(),
    templateName:
      index >= 2 && index <= 10 ? "monster " + index : "name " + index,
    schemeName: index > 12 ? "sechem 2" : "scheme 1",
    description: "description " + index,
    img: "img " + index,
    collectionName: "collectionName " + index,
    maxSupply: "maxSupply " + index,
  }));

  expect(dummyArray).toContainEqual({
    templateId: "0",
    templateName: "name 0",
    schemeName: "scheme 1",
    description: "description 0",
    img: "img 0",
    collectionName: "collectionName 0",
    maxSupply: "maxSupply 0",
  });

  expect(checkIfLastPage(dummyArray, 5, 1, "", [])).toBe(false);
  expect(checkIfLastPage(dummyArray, 5, 2, "", [])).toBe(false);
  expect(checkIfLastPage(dummyArray, 5, 3, "", [])).toBe(false);
  expect(checkIfLastPage(dummyArray, 5, 4, "", [])).toBe(true);
  expect(checkIfLastPage(dummyArray, 5, 1, "monster", [])).toBe(false);
  expect(checkIfLastPage(dummyArray, 5, 2, "monster", [])).toBe(true);
});
