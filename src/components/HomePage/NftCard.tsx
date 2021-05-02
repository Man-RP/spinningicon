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
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import React from "react";
import { NFT } from "../../reducers/NFTsSlice";

interface Props extends NFT {}

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "75.25%",
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

const DetailsTooltip = (props: any) => {
  const {
    templateName,
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

const NftCard = (props: Props) => {
  const classes = useStyles();
  const {
    templateName = "SNX",
    templateId = "000000000000",
    schemeName = "spinningcoin",
    description = "Synthetix Human or synthetic Human? Ill let you decide!",
    img = "QmR8kTQvMRtqzGY2ZAuXz3Dk5n4nhYwD8BTwDMWSDGRU5p",
    maxSupply = "500",
    mint = "125",
  } = props;

  const MintChip: ({ mint }: { mint: string | undefined }) => JSX.Element = ({
    mint,
  }) => {
    return (
      <>
        {mint ? (
          <Chip
            label={`Mint: ${mint}`}
            color="primary"
            icon={<CheckIcon />}
            classes={{ root: classes.chip }}
          />
        ) : (
          <Chip
            label={`Not in wallet`}
            color="secondary"
            icon={<CloseIcon />}
            classes={{ root: classes.chip }}
          />
        )}
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={"https://cloudflare-ipfs.com/ipfs/" + img}
        title="Template image"
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
              />
            }
            placement="left-end"
          >
            <InfoIcon />
          </Tooltip>
        </IconButton>
        <div style={{ flexGrow: 1 }}>
          <IconButton aria-label="open template's page in bloks">
            <OpenInNewIcon />
          </IconButton>
        </div>
        <MintChip mint={mint} />
      </CardActions>
    </Card>
  );
};

export default NftCard;
