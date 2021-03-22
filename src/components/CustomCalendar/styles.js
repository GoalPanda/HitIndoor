import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {

  },
  calendar: {
    height: '46px',
    border: '1px solid #CE8F8F',
    borderRadius: '4px',
    backgroundColor: '#FEF7F7',
    paddingLeft: '8px',

    '& > p': {
      marginTop: '-10px !important',
    },

    '@media only screen and (max-width: 768px)': {
      height: '40px',
      width: '100%',
    }
  },
  calendarInput: {
    fontWeight: 'normal',
    fontSize: '16px !important',
    lineHeight: '24px !important',
    height: '46px',
  }
}))
