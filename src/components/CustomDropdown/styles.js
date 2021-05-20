import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {

  },
  button: {
    height: '46px',
    width: '350px',

    color: '#616366',
    background: 'white',
    border: '1px solid #CE8F8F',
    borderRadius: '4px',
    textTransform: 'none',
    fontweight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    paddingLeft: '20px',
    paddingRight: '20px',
    justifyContent: 'left !important',
    '& > * .MuiButton-endIcon': {
      marginLeft: 'auto'
    },

    '@media only screen and (max-width: 850px)': {
      height: '40px',
      width: '100%',
    }
  },
  popper: {
    zIndex: 2,
    background: '#FFFFFF',
    borderRadius: '10px',
    width: '350px',
    boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.25)',
    marginTop: '10px',
    '@media only screen and (max-width: 850px)': {
      width: 'calc(100% - 30px)',
    },

    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-1.5em",
      marginLeft: 4,
      marginRight: 4,
      "&::before": {
        transformOrigin: "0 100%"
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.71em",
      marginLeft: 4,
      marginRight: 4,
      "&::before": {
        transformOrigin: "100% 0"
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.71em",
      height: "1em",
      width: "0.71em",
      marginTop: 4,
      marginBottom: 4,
      "&::before": {
        transformOrigin: "100% 100%"
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.71em",
      height: "1em",
      width: "0.71em",
      marginTop: 4,
      marginBottom: 4,
      "&::before": {
        transformOrigin: "0 0"
      }
    }
  },
  arrow: {
    overflow: "hidden",
    position: "absolute",
    width: "2em",
    height: "1.5em" /* = width / sqrt(2) = (length of the hypotenuse) */,
    boxSizing: "border-box",
    color: 'white',
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: "100%",
      height: "100%",
      boxShadow: theme.shadows[1],
      backgroundColor: "currentColor",
      transform: "rotate(45deg)"
    }
  },
  dropList: {
    padding: '0px',
  },
  dropContentList: {
    width: '100%',
    color: '#616366',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '22px',
    textAlign: 'left',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  paper: {
    padding: 0,
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '10px',
  },
}))
