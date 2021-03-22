import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
    height: '60px',
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
    height: '35px',
  },
  grow: {
    flexGrow: 1,
  },
  pin: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'none',
  },
  button: {
    padding: 0,
  },
  menu: {
    width: '295px',
  }
}))
