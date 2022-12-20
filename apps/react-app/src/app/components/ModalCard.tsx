import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen('body')}>
        Details <ChevronRightIcon />
      </Button>
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
                </div>
                <div className="movie-info">
                  {/* <div className="modal-header"> */}
                    <h2 className="movie-title">{props.getDetails.Title} <span className="movie-year">{props.getDetails.Year}</span>
                      <p className="movie-director">Directed by {props.getDetails.Director}</p>
                      </h2>
                    <div className="movie-header">
                      <p className="movie-rating">{props.getDetails.imdbRating}</p>
                      <FiberManualRecordIcon fontSize="small" />
                      <p className="movie-runtime">{props.getDetails.Runtime}</p>

                    </div>
                      {/* <FiberManualRecordIcon fontSize="small" /> */}
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
            : <></> }

      </Dialog>
    </div>
  );
}