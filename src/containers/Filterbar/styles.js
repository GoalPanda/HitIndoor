import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  mobileRoot: {
    marginTop: '40px',
    marginBottom: '20px',
  },
  pageTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    marginBottom: '10px',
    padding: 0
  },
  typo: {
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '30px',
    color: '#2D2D37',

    '@media only screen and (max-width: 850px)': {
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
  selectedMode: {
    background: '#243DBF',
    border: '1px solid #243DBF !important',
    color: 'white',
    '&:hOver': {
      background: '#4f63cb',
      border: '1px solid #4f63cb',
    }
  },
  selectArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media only screen and (max-width: 850px)': {
      display: 'block',
    },
  },
  buttonArea: {
    '@media only screen and (max-width: 850px)': {
      marginBottom: '10px',
    },
  }
}))
