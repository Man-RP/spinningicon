import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import InfoIcon from "@material-ui/icons/Info";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { NFT } from "../../reducers/NFTsSlice";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    height: 250,
    backgroundSize: "contain",
  },
  cardContent: {
    flexGrow: 1,
    padding: 8,
  },
  tooltip: {
    maxWidth: 600,
    padding: 15,
  },
  chip: {
    marginRight: 10,
  },
}));

const DetailsTooltip = (props: Omit<NFT, "img">) => {
  const {
    templateName,
    collectionName: collection,
    templateId,
    schemeName,
    description,
    maxSupply,
  } = props;
  return (
    <>
      <Typography variant="h4" component="h2" style={{ marginBottom: 15 }}>
        {templateName}
      </Typography>
      <Typography variant="body2" component="p">
        ID: {templateId}
        <br />
        Collection: {collection}
        <br />
        Scheme: {schemeName}
        <br />
        Description: {description}
        <br />
        Max Assets: {maxSupply}
        <br />
      </Typography>
    </>
  );
};

const NftCard = (props: NFT) => {
  const classes = useStyles();
  const {
    templateName,
    templateId,
    schemeName,
    collectionName,
    description,
    img,
    maxSupply,
    mint,
  } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={"https://cloudflare-ipfs.com/ipfs/" + img}
        title="Template Image"
      />

      <CardContent className={classes.cardContent}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          align="center"
          style={{ marginBottom: 0 }}
        >
          {templateName}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="info">
          <Tooltip
            classes={{
              tooltip: classes.tooltip,
            }}
            title={
              <DetailsTooltip
                templateName={templateName}
                schemeName={schemeName}
                description={description}
                templateId={templateId}
                maxSupply={maxSupply}
                collectionName={collectionName}
              />
            }
            placement="left-end"
          >
            <InfoIcon />
          </Tooltip>
        </IconButton>
        <div style={{ flexGrow: 1 }}>
          <IconButton
            aria-label="open template's page in bloks"
            target="_blank"
            href={
              "https://wax.atomichub.io/explorer/template/spinningicon/" +
              templateId
            }
          >
            <OpenInNewIcon />
          </IconButton>
        </div>
        {mint && mint !== "-1" && (
          <Chip
            label={`Mint: ${mint}`}
            color="secondary"
            icon={<CheckIcon />}
            classes={{ root: classes.chip }}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default NftCard;
