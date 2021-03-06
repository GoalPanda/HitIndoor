import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  mobileRoot: {
    marginTop: '40px',
    marginBottom: '20px',
  },
  pageTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '26px',
    marginBottom: '24px',
    padding: 0
  },
  typo: {
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '30px',
    color: '#2D2D37',

    '@media only screen and (max-width: 768px)': {
      fontSize: '14px',
      lineHeight: '21px',
      margin: 0,
      justifyContent: 'left !important',
      marginBottom: '20px',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    height: '46px',
    border: '1px solid #CE8F8F',
    borderRadius: '4px',
    backgroundColor: '#FEF7F7',
    marginRight: '20px',

    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
  },
}))
