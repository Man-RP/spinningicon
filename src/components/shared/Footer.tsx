import React from "react";
import { Container, Link, makeStyles, Typography } from "@material-ui/core";

function Copyright() {
  const classes = useStyles();
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      className={classes.copyright}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        SpinningIcons
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  copyright: {
    // marginTop: theme.spacing(3),
  },
  textAndLinks: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  links: {
    marginTop: theme.spacing(3),
    display: "flex",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Copyright />
      <Container maxWidth="sm" className={classes.textAndLinks}>
        <div>
          <Typography variant="h6" align="left">
            Hey, I'm Hila!
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            color="textSecondary"
            component="p"
          >
            the Creator of SpinningIcons Collections, I Create NFTs Fanart of
            Opensource Cryptocurrency for swag purposes
          </Typography>
        </div>
        <div className={classes.links}>
          <Link
            color="inherit"
            href="https://twitter.com/spinningicons?lang=he"
            // className={classes.link}
          >
            Twitter
          </Link>
          <Link
            color="inherit"
            href="https://wax.atomichub.io/explorer/collection/spinningicon"
            // className={classes.link}
          >
            AtomicHub
          </Link>
          <Link
            color="inherit"
            href="https://discord.gg/kcqFv7AuQK,%20https://t.me/joinchat/_1vSVpbxH9o5ZGE0%20,%20https://twitter.com/SpinningIcons"
            // className={classes.link}
          >
            Discord
          </Link>
          <Link
            color="inherit"
            href="https://t.me/joinchat/_1vSVpbxH9o5ZGE0"
            // className={classes.link}
          >
            Telegram
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
