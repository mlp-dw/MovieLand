import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../reducers/MovieSlice';
import { setPick } from '../reducers/PicksSlice';

import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Loader from './Loader'
import GradeIcon from '@material-ui/icons/Grade';



export default function MovieDetails(props:any) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const movieState = useSelector((state: {movieStore: {movies: {}, movie: {}, isLoading: boolean}}) => {
    return state.movieStore
  });

  const moviePicks = useSelector((state: {moviePicks: {value: any}}) => {
    return state.moviePicks.value
  });

  let dispatch = useDispatch();

  

  function load(value:boolean){
      dispatch(setIsLoading(value))
  }

  
  return (
    <div>
      <div onClick={()=>load(true)}>
      <Button variant="contained" color="primary" onClick={handleClickOpen('body')}>
        Details <ChevronRightIcon />
      </Button>

      </div>
      { movieState.isLoading == true ? 
        // @ts-ignore
          <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          >
            <Loader/>
          </Dialog>
        :
        // @ts-ignore
          <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          >
              { props.getDetails ? 
              <>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      <CloseIcon/>
                    </Button>
                  </DialogActions>
                <div className="custom-modal">
                    <div className="movie-poster">
                        <img src ={(props.getDetails.Poster != "N/A") ? props.getDetails.Poster : "../../assets/image_not_found.png"} alt="movie poster" />
                        {
                          Object.values(moviePicks).includes(props.getDetails.Title) ? <GradeIcon/> :
                          <Button variant="contained" color="primary" onClick={() => dispatch(setPick(props.getDetails.Title))}>
                              Add to favourites
                          </Button>
                        }
                    </div>
                    <div className="movie-info">
                        <h2 className="movie-title">{props.getDetails.Title} <span className="movie-year">{props.getDetails.Year}</span>
                          <p className="movie-director">Directed by {props.getDetails.Director}</p>
                          </h2>
                        <div className="movie-header">
                          <p className="movie-rating">{props.getDetails.imdbRating}</p>
                          {(props.getDetails.Runtime != "N/A") ?  
                            <>
                              <FiberManualRecordIcon fontSize="small" />
                              <p className="movie-runtime">{props.getDetails.Runtime }</p>
                            </>
                          : <></>}
                        </div>
                        <p className="plot">{props.getDetails.Plot}</p>
                        <p className="genre"><b>Genre:</b> {props.getDetails.Genre}</p>
                        <p className="actors"><b>Actors:</b> {props.getDetails.Actors}</p>

                        <p className="writer"><b>Writer:</b> {props.getDetails.Writer}</p>
                        <p className="language"><b>Language:</b> {props.getDetails.Language}</p>
                        <p className="awards"><b>Awards:</b> {props.getDetails.Awards}</p>
                        <p className="awards"><b>BoxOffice</b> {props.getDetails.BoxOffice}</p>

                    </div>
                </div>
                </> 
                :
                    <Loader />
                }

          </Dialog>
      }
    </div>
  );
}