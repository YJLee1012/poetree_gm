import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    // padding: theme.spacing(2),
    backgroundColor: '#f9f5ef',
      borderRadius: '5%',
    // margin: '30px 15%',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#f9f5ef',
  },
  image : {
    width: '30%',
    height : '30%',
    margin : '100px 100px 0 0 ',
  },
  title : {
    padding : '10px',
    width: '50%',
    border : '1px solid #f9f5ef',
    margin : '100px 50px 50px 100px',
  },
  content : {
    padding : '10px',
    width : '50%',
    // height: '500px',
    margin : '50px 50px 50px 100px',
  },
  hashtag : {
    width : '50%',
  },
  buttonSubmit: {
    marginBottom: 10,
    margin : 'auto',
  },
}));