import React, { useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import NftCard from "./NftCard";
import { getAllTemplates } from "../../api";
import { useAppSelector, useAppDispatch } from "../../hooks/storeHooks";
import { fetchNFTs } from "../../reducers/NFTsSlice";

interface Props {}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Cards = (props: Props) => {
  const classes = useStyles();
  const wax = useAppSelector((state) => state.wax.waxInstance);
  const userName = useAppSelector((state) => state.user.userName);
  const NFTs = useAppSelector((state) => state.NFTs.data);
  const cardsStatus = useAppSelector((state) => state.NFTs.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cardsStatus === "idle") {
      dispatch(fetchNFTs());
    }
  }, [cardsStatus, dispatch]);

  console.log(NFTs);
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {NFTs.map((NFT, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <NftCard {...NFT} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cards;
