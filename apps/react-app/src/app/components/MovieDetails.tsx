import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function MovieDetails(props:any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" type="button" onClick={handleOpen}>
        Details <ChevronRightIcon />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">details</h2>
            <div id="transition-modal-description">
              {/* <div className="movie-poster">
                  <img src ={(props.movieDetails.Poster != "N/A") ? props.movieDetails.Poster : "../../assets/image_not_found.png"} alt="movie poster" />
              </div>
              <div className="movie-info">
                  <h3 className="movie-title">${props.movieDetails.Title}</h3>
                  <ul className="movie-misc-info">
                      <li className="year">Year: ${props.movieDetails.Year}</li>
                      <li className="rated">Ratings: ${props.movieDetails.Rated}</li>
                      <li className="released">Released: ${props.movieDetails.Released}</li>
                  </ul>
                  <p className="genre"><b>Genre:</b> ${props.movieDetails.Genre}</p>
                  <p className="writer"><b>Writer:</b> ${props.movieDetails.Writer}</p>
                  <p className="actors"><b>Actors: </b>${props.movieDetails.Actors}</p>
                  <p className="plot"><b>Plot:</b> ${props.movieDetails.Plot}</p>
                  <p className="language"><b>Language:</b> ${props.movieDetails.Language}</p>
                  <p className="awards"><b><i className="fas fa-award"></i></b> ${props.movieDetails.Awards}</p>
              </div> */}
            </div>
          </div>
        </Fade>
      </Modal>

      
    </div>
  );
}
