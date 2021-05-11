import { Container, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { getTemplateMint } from "../../helper";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchNFTs } from "../../reducers/NFTsSlice";
import { IMints } from "../../reducers/userSlice";
import NftCard from "./NftCard";

interface Props {}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const Cards = (props: Props) => {
  const classes = useStyles();

  const NFTs = useAppSelector((state) => state.NFTs.data);
  const mints = useAppSelector((state) => state.user.mints);
  const cardsStatus = useAppSelector((state) => state.NFTs.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cardsStatus === "idle") {
      dispatch(fetchNFTs());
    }
  }, [cardsStatus, dispatch]);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {NFTs.map((NFT, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <NftCard {...NFT} mint={getTemplateMint(NFT.templateId, mints)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cards;
