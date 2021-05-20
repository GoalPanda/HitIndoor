import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    marginRight: '8px',
  },
  content: {
    marginLeft: '8px',
    color: '#616366',
    textTransform: 'none',
    fontweight: 'normal',
    fontSize: '14px',
    lineHeight: '21px',
    '@media only screen and (max-width: 967px)': {
      fontSize: '12px',
      lineHeight: '15px',
    }
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
}))
