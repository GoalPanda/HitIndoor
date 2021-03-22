import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {
  },
  title: {
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '30px',
    color: '#2D2D37',
    marginTop: 0,
  },
  popper: {
    zIndex: 2,
    background: '#FFFFFF',
    borderRadius: '10px',
    width: '500px',
    boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.25)',
    marginTop: '20px',
    '@media only screen and (max-width: 768px)': {
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
  paper: {
    padding: '16px',
    borderRadius: '10px',
  },
  background: {
    width: '100%',
    borderRadius: '6px',
  },
  content: {
    marginTop: '12px',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#616366'
  }
}))
