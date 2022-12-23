import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPicks } from '../reducers/PicksSlice';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import Loader from './Loader';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GradeIcon from '@material-ui/icons/Grade';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor:'#143055',
    color: '#ffffff',
    padding:'5%',
},
bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
},
spacing: {
    margin:'2% 0',
},
fav: {
    display:'flex',
    alignItems:'center',
},
titles: {
    fontSize: 16,
    padding:'1% 0',
    margin:'0 2%'

  },
  pos: {
    marginBottom: 12,
  },
});



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

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  
  const moviePicks = useSelector((state: {moviePicks: {value: any}}) => {
    return state.moviePicks.value
  });

  let dispatch = useDispatch();

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    if (moviePicks) {
        dispatch(getPicks());
    }
}, [open]);


    return (
        <div>
        <Button variant="contained" color="secondary" onClick={handleClickOpen('body')}>
            <GradeIcon/>
        </Button>

        { Object.keys(moviePicks).length < 0 ? 
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
                <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2" className={classes.fav}>
                        <GradeIcon/> FAVORITES
                    </Typography>
                    <div className={classes.spacing}>
                        {Object.keys(moviePicks).map((moviePicksKey)=>{
                            return (
                                <Typography variant="h5" component="h3" className={classes.titles} key={moviePicksKey}>
                                    {bull} {moviePicks[moviePicksKey]} ({moviePicksKey})
                                </Typography>
                            )
                        })}  
                    </div>   
                </CardContent>
                </Card>
            </Dialog>
        }
        </div>
    );
}