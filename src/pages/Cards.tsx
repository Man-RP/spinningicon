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
import { fetchAllNFTs, icreasePage, NFTsSelector } from "../reducers/NFTsSlice";
import { fetchAllSchemas } from "../reducers/schemasSlice";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  searchContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  circularProgress: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
  },
}));

const Cards = () => {
  const classes = useStyles();

  const NFTs = useAppSelector(NFTsSelector);
  const mints = useAppSelector((state) => state.user.mints);
  const cardsStatus = useAppSelector((state) => state.NFTs.status);
  const schemasStatus = useAppSelector((state) => state.schemas.status);
  const hasMore = useAppSelector((state) => state.NFTs.hasMore);

  const dispatch = useAppDispatch();

  const handleNextScroll: () => void = () => dispatch(icreasePage());

  useEffect(() => {
    if (schemasStatus === "idle") dispatch(fetchAllSchemas());
    if (cardsStatus === "idle") dispatch(fetchAllNFTs());
  }, [mints]);

  const ScrollFetchWrapper: ({
    children,
  }: {
    children: ReactChild;
  }) => JSX.Element = ({ children }) => (
    <InfiniteScroll
      style={{ padding: 50 }}
      dataLength={NFTs.length}
      next={handleNextScroll}
      hasMore={hasMore}
      loader={
        <div className={classes.circularProgress}>
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
        <div className={classes.searchContainer}>
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
