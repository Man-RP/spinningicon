import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React, { ReactChild, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NftCard from "../components/HomePage/NftCard";
import { getTemplateMint } from "../helper";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchNFTs } from "../reducers/NFTsSlice";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const Cards = () => {
  const classes = useStyles();

  const NFTs = useAppSelector((state) => state.NFTs.data);
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
            // backgroundColor: "red",
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

  console.log("render");
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <ScrollFetchWrapper>
        <Grid container spacing={4}>
          {NFTs.map((NFT, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <NftCard
                {...NFT}
                mint={mints && getTemplateMint(NFT.templateId, mints)}
              />
            </Grid>
          ))}
        </Grid>
      </ScrollFetchWrapper>
    </Container>
  );
};

export default Cards;
