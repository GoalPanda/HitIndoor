import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {
    zIndex: '2002 !important',
  },
  title: {
    fontWeight: '600',
    fontSize: '25px',
    lineHeight: '37px',
    color: '#243DBF',
    '@media only screen and (max-width: 850px)': {
      fontSize: '14px',
      lineHeight: '21px',
    },
  },
  subtitle: {
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '30px',
    color: '#243DBF',
    '@media only screen and (max-width: 850px)': {
      fontSize: '14px',
      lineHeight: '21px',
    },
  },
  description: {
    marginTop: '10px',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '27px',
    color: '#616366',
    '@media only screen and (max-width: 850px)': {
      fontSize: '12px',
      lineHeight: '18px',
    },
  },
  background: {
    // width: '100%',
    padding: 'auto',
    borderRadius: '6px',
  },
  content: {
    marginTop: '12px',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#616366'
  },
  type: {
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '46px',
    color: '#616366',
    marginRight: '88px',
    '@media only screen and (max-width: 850px)': {
      marginRight: '0px',
      width: '100% !important',
      fontSize: '14px',
      lineHeight: '21px',
      marginBottom: '8px',
    },
  },
  control: {
    display: 'flex',
    paddingTop: '50px !important',
    paddingBottom: '90px !important',
    '@media only screen and (max-width: 850px)': {
      paddingTop: '30px !important',
      paddingBottom: '50px !important',
      display: 'block',
    },
  },
  paper: {
    padding: '32px',
    '@media only screen and (max-width: 850px)': {
      padding: '16px',
    },
  },
  book: {
    height: '46px',
    width: '210px',
    background: '#E52F3A',
    boxShadow: '0px 6px 20px rgba(229, 47, 58, 0.4)',
    color: 'white',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '27px',
    '&:hOver': {
      background: '#ea5861',
    },
    '@media only screen and (max-width: 850px)': {
      height: '35px',
      width: '100px',
      fontSize: '12px',
      lineHeight: '18px',
    },
  },
  close: {
    float: 'right',
    height: '30px',
    width: '75px',
    border: '1px solid #E52F3A',
    background: '#F9F9F5',
    boxShadow: '0px 6px 20px rgba(229, 47, 58, 0.4)',
    color: '#E52F3A',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '18px',
    '&:hOver': {
    },
    '@media only screen and (max-width: 850px)': {
      height: '25px',
      width: '75px',
      fontSize: '12px',
      lineHeight: '18px',
    },
  },
  buttons: {
    height: '25px',
    marginTop: '20px',
  },

  moreInfo: {
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '21px',
    textTransform: 'none',
    marginLeft: '130px',
    textDecoration: 'underline',
    '&:hOver': {
      textDecoration: 'underline !important',
    },
    '@media only screen and (max-width: 850px)': {
      marginLeft: '10px'
    }
  },
  detail: {
    fontSize: '21px',
    color: '#E52F3A',
    marginLeft: '30px',
    '@media only screen and (max-width: 850px)': {
      fontSize: '14px',
      marginLeft: '10px',
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))
