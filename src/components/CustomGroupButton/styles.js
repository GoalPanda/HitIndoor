import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {
  },
  arrow: {
    minWidth: '20px !important',
    padding: 0,
    border: 'none !important',
  },
  buttonGroup: {
    border: '1px solid #CE8F8F',
    borderRadius: '4px',
    height: '46px',
    backgroundColor: '#FEF7F7',
    marginRight: '20px',
    '@media only screen and (max-width: 850px)': {
      height: '35px',
      marginRight: '10px',
    }
  },
  button: {
    textTransform: 'none',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    border: 'none !important',
    '@media only screen and (max-width: 850px)': {
      fontSize: '14px',
      lineHeight: '21px',
    }
  },
}))
