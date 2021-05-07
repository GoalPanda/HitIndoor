import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    marginBottom: '80px',
    boxShadow: '0px 15px 25px rgba(239, 207, 207, 0.5)',
  },
  contentTable: {
    '& > table, th, td': {
      borderCollapse: 'collapse',
    },
  },
  classArea: {
    border: '1px solid #999999',
    '@media only screen and (max-width: 768px)': {
      borderRight: 'none !important',
    }
  },
  lastTableHeaderCell: {
    borderRadius: '0px 10px 0px 0px',
  },
  firstTableHeaderCell: {
    borderRadius: '10px 0px 0px 0px',
    borderLeft: 'none !important',
    textAlign: 'center !important',
    width: '180px !important',
    minWidth: '180px !important',
    maxWidth: '180px !important',
    '@media only screen and (max-width: 768px)': {
      width: '135px !important',
      minWidth: '135px !important',
      maxWidth: '135px !important',
    }
  },
  tableHeader: {
    minWidth: '135px',
    height: '70px',
    maxHeight: '70px',
    minHeight: '70px',
    color: '#ffffff',
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '36px',
    textAlign: 'left',
    paddingLeft: '8px',
    paddingRight: '8px',
    background: '#828D9C',
    border: 'none',
    borderLeft: '1px solid #ffffff',
    '@media only screen and (max-width: 768px)': {
      minWidth: '100px',
      height: '40px',
      maxHeight: '40px',
      minHeight: '40px',
      fontSize: '14px',
      lineHeight: '21px',
    }
  },
  tableCell: {
    minWidth: '135px',
    height: '70px',
    maxHeight: '70px',
    minHeight: '70px',
    color: '#2D2D37',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '27px',
    textAlign: 'left',
    paddingLeft: '8px',
    paddingRight: '8px',
    background: '#F9F9F5',
    border: '1px solid #999999',
    '@media only screen and (max-width: 768px)': {
      minWidth: '100px',
      height: '40px',
      maxHeight: '40px',
      minHeight: '40px',
      fontSize: '12px',
      lineHeight: '18px',
    }
  },
  firstTableCell: {
    borderLeft: 'none !important',
    textAlign: 'center !important',
    width: '180px !important',
    minWidth: '180px !important',
    maxWidth: '180px !important',
    '@media only screen and (max-width: 768px)': {
      width: '135px !important',
      minWidth: '135px !important',
      maxWidth: '135px !important',
    }
  },
  secondTableCell: {
    width: '500px !important',
    minWidth: '500px !important',
    maxWidth: '500px !important',
    '@media only screen and (max-width: 768px)': {
      width: '300px !important',
      minWidth: '300px !important',
      maxWidth: '300px !important',
    }
  },
  otherTableCell: {
  },
  lastTableCell: {
    borderRight: 'none !important',
  },
  signupButton: {
    height: '46px',
    background: '#E52F3A',
    boxShadow: '0px 6px 20px rgba(229, 47, 58, 0.4)',
    color: 'white',
    marginLeft: '50px',
    fontSize: '18px',
    lineHeight: '27px',
    '&:hOver': {
      background: '#ea5861',
    },

    '@media only screen and (max-width: 768px)': {
      marginLeft: '20px',
      height: '30px',
      fontSize: '12px',
      lineHeight: '18px',
    }
  },
  bigFont: {
    fontWeight: '600',
    fontSize: '25px',
    lineHeight: '37px',

    '@media only screen and (max-width: 768px)': {
      fontSize: '16px',
      lineHeight: '24px',
    }
  },
  classHeading: {
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '36px',
    color: '#E52F3A',

    '@media only screen and (max-width: 768px)': {
      fontSize: '14px',
      lineHeight: '21px',
    }
  },
  classHeader: {
    width: '100%'
  },
  detail: {
    padding: '0px !important',
    '& > table, th, td': {
      borderCollapse: 'collapse',
    },
  },
  noContent: {
    height: '50px',
    width: '100%',
    paddingLeft: '24px',
    cursor: 'pointer !important',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '50px',
    textAlign: 'left',
    color: '#2D2D37',
    background: '#F9F9F5',
    borderTop: '1px solid #999999',
    '@media only screen and (max-width: 768px)': {
      height: '50px',
      lineHeight: '50px',
    }
  },
  summary: {
    '&:hOver': {
      background: '#F9E8E8',
    },
    '& > .Mui-expanded': {
      minHeight: '36px !important',
      height: '36px !important',
      marginTop: '12px',
      marginBottom: '12px',
    }
  },
  accordion: {
    margin: '0 !important',
    '& > .Mui-expanded': {
      minHeight: '48px !important',
    },
    '& > .MuiAccordionSummary-expandIcon': {
      margin: '0 !important'
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))
