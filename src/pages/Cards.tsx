import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React, { ReactChild, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Hero from "../components/HomePage/Hero";
import NftCard from "../components/HomePage/NftCard";
import Search from "../components/HomePage/Search";
import { getTemplateMint } from "../helper";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchNFTs, NFTsSelector } from "../reducers/NFTsSlice";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  search: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Cards = () => {
  const classes = useStyles();

  const NFTs = useAppSelector(NFTsSelector);
  const mints = useAppSelector((state) => state.user.mints);
  const cardsStatus = useAppSelector((state) => state.NFTs.status);
  const hasMore = useAppSelector((state) => state.NFTs.hasMore);

  const dispatch = useAppDispatch();

  const fetchData = () => dispatch(fetchNFTs());

  useEffect(() => {
    if (cardsStatus === "idle") {
      fetchData();
    }
  }, [cardsStatus, dispatch]);

  const ScrollFetchWrapper: ({
    children,
  }: {
    children: ReactChild;
  }) => JSX.Element = ({ children }) => (
    <InfiniteScroll
      style={{ padding: 50 }}
      dataLength={NFTs.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 50,
          }}
        >
          <CircularProgress />
        </div>
      }
    >
      {children}
    </InfiniteScroll>
  );

  return (
    <>
      <Hero />
      <Container className={classes.cardGrid} maxWidth="lg">
        <div className={classes.search}>
          <Search />
        </div>
        <ScrollFetchWrapper>
          <Grid container spacing={3}>
            {NFTs.map((NFT, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <NftCard
                  {...NFT}
                  mint={mints && getTemplateMint(NFT.templateId, mints)}
                />
              </Grid>
            ))}
          </Grid>
        </ScrollFetchWrapper>
      </Container>
    </>
  );
};

export default Cards;
