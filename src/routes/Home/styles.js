import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme => ({
  root: {
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))
