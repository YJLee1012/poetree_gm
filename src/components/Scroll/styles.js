import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    toTop: {
        zIndex: 999,
        position: 'fixed',
        bottom: '10vh',
        backgroundColor: '#DCDCDC',
        color: 'black',
        "&:hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: '#397BA6',
            backgroundColor: '#DCDCDC'
        },
        [theme.breakpoints.up('xs')]: {
            right: '5%',
            backgroundColor: 'rgb(220,220,220,0.7)',
        },
        [theme.breakpoints.up('lg')]: {
            right: '6.5%',
        },
    }
})
)