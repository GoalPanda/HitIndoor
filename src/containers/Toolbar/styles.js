import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  pageTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '130px',
    background: '#FFFFFF',
    boxShadow: '0px 6px 35px rgba(239, 207, 207, 0.5)',
    borderRadius: '7px',
    height: '80px',
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  typo: {
    fontWeight: '500',
    fontSize: '25px',
    lineHeight: '37px',
    color: '#2D2D37',
    '@media only screen and (max-width: 768px)': {
      fontSize: '14px',
      lineHeight: '42px',
      margin: 0,
      justifyContent: 'left !important',
      paddingLeft: '12px',
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
  mobileButton: {
    height: '35px',
    border: '1px solid #CE8F8F',
    borderRadius: '4px',
    backgroundColor: '#FEF7F7',

    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '21px',
    marginRight: '10px',
  },
  selectedMode: {
    background: '#243DBF',
    border: '1px solid #243DBF !important',
    color: 'white',
    '&:hOver': {
      background: '#4f63cb',
      border: '1px solid #4f63cb',
    }
  },
  mobileRoot: {
    background: 'white',
    borderRadius: '7px',
    boxShadow: '0px 6px 35px rgba(239, 207, 207, 0.5)',
    height: '212px',
    marginTop: '75px',
  },
  checkboxArea: {
    width: '200px',
    textAlign: 'left'
  },
}))
