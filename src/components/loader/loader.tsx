import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)',
            zIndex: 3
        },
    }),
);

const Loader = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
}

export default Loader;