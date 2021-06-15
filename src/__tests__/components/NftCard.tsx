import React from "react";
import ReactDOM from "react-dom";
import {
  render,
  fireEvent,
  cleanup,
  getByRole,
  findByText,
  getByLabelText,
  getByText,
} from "@testing-library/react";
import NftCard from "../../components/HomePage/NftCard";

afterEach(cleanup);

describe("<NftCard/>", () => {
  const component: (mint?: string | undefined) => JSX.Element = (
    mint = undefined
  ) => (
    <NftCard
      templateName="test template"
      templateId="0"
      schemeName="scheme name"
      collectionName="collection name"
      description="description"
      img=""
      maxSupply="500"
      mint={mint}
    />
  );

  it("hover on icon shows tooltip", async () => {
    const { findByText, getByLabelText } = render(component());

    fireEvent.mouseOver(getByLabelText("show-tooltip"));
    expect(await findByText(/ID:/i)).toBeInTheDocument();
  });

  it("click on icon navigates to AtomicHub", async () => {
    const { getByLabelText } = render(component());

    expect(getByLabelText("open template's page in bloks")).toHaveAttribute(
      "href",
      "https://wax.atomichub.io/explorer/template/spinningicon/0"
    );
  });

  it("showing mint number if user has one of its assets`", async () => {
    const { getByText } = render(component("53"));

    expect(getByText("Mint: 53")).toBeInTheDocument();
  });
});
