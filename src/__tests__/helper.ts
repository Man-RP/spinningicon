import {
  addUserMintsToNFTs,
  filterNFTsByCollection,
  filterNFTsByTemplateName,
  getTemplateMint,
} from "../helper";
import { NFT } from "../reducers/NFTsSlice";
import { IMints } from "../reducers/userSlice";

it("add mints to each NFT data", () => {
  const dummyNoMintsNFTS: NFT[] = [
    {
      templateId: "45645134325",
      templateName: "dummy name",
      schemeName: "dummy scheme",
      description: "hdfhsd",
      img: "",
      maxSupply: "4540",
    },
    {
      templateId: "4134546352",
      templateName: "dummy name2",
      schemeName: "dummy scheme2",
      description: "fggf",
      img: "",
      maxSupply: "4040",
    },
    {
      templateId: "4134542635",
      templateName: "dummy name3",
      schemeName: "dummy scheme3",
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
    description: "fggf",
    img: "",
    maxSupply: "4040",
    mint: "350",
  });
  expect(addUserMintsToNFTs(dummyNoMintsNFTS, dummyMints)).toContainEqual({
    templateId: "4134542635",
    templateName: "dummy name3",
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
  const collections = ["harta", "barta"];

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
      maxSupply: "4041",
    },
  ];

  expect(filterNFTsByCollection(dummyNoMintsNFTS, collections)).toContainEqual({
    templateId: "45645134325",
    templateName: "dummy name",
    schemeName: "dummy scheme",
    description: "hdfhsd",
    img: "",
    maxSupply: "4540",
    collection: "harta",
  });

  expect(filterNFTsByCollection(dummyNoMintsNFTS, collections)).toContainEqual({
    templateId: "4134546352",
    templateName: "dummy name2",
    schemeName: "dummy scheme2",
    description: "fggf",
    img: "",
    maxSupply: "4040",
    collection: "barta",
  });

  expect(
    filterNFTsByCollection(dummyNoMintsNFTS, collections)
  ).not.toContainEqual({
    templateId: "4134542635",
    templateName: "dummy name3",
    schemeName: "dummy scheme3",
    description: "fggdaf",
    img: "",
    maxSupply: "4041",
  });

  expect(filterNFTsByCollection(dummyNoMintsNFTS, "harta")).toContainEqual({
    templateId: "45645134325",
    templateName: "dummy name",
    schemeName: "dummy scheme",
    description: "hdfhsd",
    img: "",
    maxSupply: "4540",
    collection: "harta",
  });

  expect(filterNFTsByCollection(dummyNoMintsNFTS, "")).toContainEqual({
    templateId: "4134542635",
    templateName: "dummy name3",
    schemeName: "dummy scheme3",
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
      maxSupply: "4041",
    },
  ];

  expect(
    filterNFTsByTemplateName(dummyNoMintsNFTS, "dummy name3")
  ).toContainEqual({
    templateId: "4134542635",
    templateName: "dummy name3",
    schemeName: "dummy scheme3",
    description: "fggdaf",
    img: "",
    maxSupply: "4041",
  });

  expect(
    filterNFTsByTemplateName(dummyNoMintsNFTS, "dummy name3")
  ).not.toContainEqual({
    templateId: "4134546352",
    templateName: "dummy name2",
    schemeName: "dummy scheme2",
    description: "fggf",
    img: "",
    maxSupply: "4040",
    collection: "barta",
  });

  expect(filterNFTsByTemplateName(dummyNoMintsNFTS, "dummy")).toContainEqual({
    templateId: "4134542635",
    templateName: "dummy name3",
    schemeName: "dummy scheme3",
    description: "fggdaf",
    img: "",
    maxSupply: "4041",
  });
});
