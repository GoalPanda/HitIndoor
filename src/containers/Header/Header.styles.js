import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    height: '100px',
    background: 'white',
    boxShadow: '0px 6px 35px rgba(239, 207, 207, 0.5)',
  },
  toolbar: {
    padding: 0,
    height: '100%',
  },
  container: {
    height: '100%',
  },
  image: {
    cursor: 'pointer',
    userSelect: 'none',
    height: '80px',
  },
  grow: {
    flexGrow: 1,
  },
  pin: {
    borderBottom: '3px solid white',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginRight: '34px',
    textTransform: 'none',
  },
  hightBorder: {
    borderBottom: '3px solid #E52F3A',
  },
  button: {
    fontweight: 'normal',
    fontSize: '18px !important',
    lineHeight: '27px !important',
  },
  hightButton: {
    color: '#E52F3A'
  },
  loader: {
    position: 'absolute',
    top: '0px',
    width: '100%',
  }
}))
