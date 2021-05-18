import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          SpinningIcons
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Welcome to my beautiful site
        </Typography>
        {/* <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            {schemas.map((schema, index) => (
              <Grid item>
                <Chip label={schema} clickable color="primary" />
              </Grid>
            ))}
          </Grid>
        </div> */}
      </Container>
    </div>
  );
};

export default Hero;
