import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import MovieDetails from './MovieDetails';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      color: '#ffffff',
      backgroundColor: '#143055',
      margin: '5% 0',
      justifyContent: 'space-between',
      width: '100%',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'space-between',
    },
    cover: {
      width: 200,
      height: 300,
    },
  }),
);

export default function MovieCard(props:any) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root} id={props.id}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div>
            <Typography component="h5" variant="h5">
              {props.name}
            </Typography>
            <Typography variant="subtitle1">
              {props.year} ({props.type})
            </Typography>
          </div>
          <MovieDetails />
        </CardContent>
      </div>
      { props.image != "N/A"  ? (
        <CardMedia
          className={classes.cover}
          image={props.image}
          title={props.name}
        />
        ):(  
          <CardMedia
          className={classes.cover}
          image="../../assets/image_not_found.png"
          title={props.name}
        />
        )
      } 
      
    </Card>
  );
}
