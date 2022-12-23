import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getMovieById } from '../reducers/MovieSlice';
import { store } from '../store/store';
import MovieDetails from './MovieDetails';
export type RootState = ReturnType<typeof store.getState>


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      color: '#ffffff',
      display: 'flex',
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

  let dispatch = useDispatch();
  let movieState = useSelector((state: RootState) => {
    return state.movieStore
  });;
  
  function openDetails(id:string){
      dispatch(getMovieById({imdbID:props.id}))
  }

  return (
      <Card className="movie-card">
        <div className={classes.details}>
          <CardContent className={classes.content}>

            <div className='movie-card-header'>
              <div className='movie-card-header-title'>
                <Typography component="h5" variant="h5">
                  {props.name}
                </Typography>
                <Typography variant="subtitle1">
                  {props.year} ({props.type})
                </Typography>
              </div>
              <div onClick={()=>openDetails(props.id) }>
                <MovieDetails
                  getDetails={movieState.movie}
                  />  
              </div>
            </div>

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
