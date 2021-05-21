import {
  Chip,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { toggleSchemaFilter } from "../../reducers/NFTsSlice";

const useStyles = makeStyles((theme) => ({
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

  const schemas = useAppSelector((state) => state.schemas.data);

  const dispatch = useAppDispatch();

  const handleToggleSchema = (schema: string) => {
    dispatch(toggleSchemaFilter(schema));
  };

  const schemasFilter = useAppSelector((state) => state.NFTs.schemasFilter);

  const SchemaChip: ({
    schemaName,
    filterOn,
    onClick,
  }: {
    schemaName: string;
    filterOn: boolean;
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  }) => JSX.Element = ({ schemaName, filterOn, onClick }) => {
    return (
      <>
        <Chip
          label={schemaName}
          clickable
          color={filterOn ? "secondary" : "primary"}
          onClick={onClick}
        />
      </>
    );
  };

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md">
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
          Welcome to the Biggest Coin Collection on the Wax Platform!
        </Typography>
        <div className={classes.heroButtons}>
          {schemas.length > 0 && (
            <>
              <Typography
                variant="subtitle2"
                align="center"
                color="textSecondary"
                paragraph
              >
                Our Schemas:
              </Typography>
              <Grid container spacing={1} justify="center">
                {schemas.map((schema, index) => (
                  <Grid item key={index}>
                    <SchemaChip
                      schemaName={schema}
                      filterOn={schemasFilter.includes(schema)}
                      onClick={() => handleToggleSchema(schema)}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Hero;
