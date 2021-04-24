import React, { useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import NftCard from "./NftCard";
import { getAllTemplates } from "../../api";
import { useAppSelector } from "../../hooks/storeHooks";

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

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <NftCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cards;
