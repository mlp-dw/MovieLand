import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HoverRating from './Rating'

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

            { props.getDetails ? 
            <div id="transition-modal-description" className="custom-modal">
                <div className="movie-poster">
                    <img src ={(props.getDetails.Poster != "N/A") ? props.getDetails.Poster : "../../assets/image_not_found.png"} alt="movie poster" />
                </div>
                <div className="movie-info">
                  {/* <div className="modal-header"> */}
                    <h2 className="movie-title">{props.getDetails.Title} <span className="year">{props.getDetails.Year}</span></h2>

                    <p className="genre"><b>Genre:</b> {props.getDetails.Genre}</p>
                    <p className="writer"><b>Writer:</b> {props.getDetails.Writer}</p>
                    <p className="actors"><b>Actors:</b> {props.getDetails.Actors}</p>
                    <p className="plot">{props.getDetails.Plot}</p>
                    <p className="language"><b>Language:</b> {props.getDetails.Language}</p>
                    <p className="awards"><b>Awards:</b> {props.getDetails.Awards}</p>
                    <p className="awards"><b>BoxOffice</b> {props.getDetails.BoxOffice}</p>
                    <p className="awards"><b>Country</b> {props.getDetails.Country}</p>
                    <p className="awards"><b>DVD</b> {props.getDetails.DVD}</p>
                    <p className="awards"><b>Director</b> {props.getDetails.Director}</p>
                    <p className="awards"><b>Runtime</b> {props.getDetails.Runtime}</p>
                    <HoverRating rating={props.getDetails.imdbRating} />
                    {/* <p className="awards"><b>imdbRating</b> </p> */}
                    <p className="awards"><b>imdbVotes</b> {props.getDetails.imdbVotes}</p>
                </div>
            </div> 
            : <></> }
          </div>
        </Fade>
      </Modal>

      
    </div>
  );
}
