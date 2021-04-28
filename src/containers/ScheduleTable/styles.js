import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    boxShadow: '0px 15px 25px rgba(239, 207, 207, 0.5)',
    height: 'calc(100vh - 260px)'
  },
  timeLineArea: {
    left: '0',
    zIndex: '3',
    position: 'sticky',
  },
  contentTable: {
    '& > table, th, td': {
      borderCollapse: 'collapse',
    },
    position: 'relative',
  },
  timeLineEffect: {
    zIndex: '4',
    height: '100%',
    width: '80px',
    minWidth: '80px',
    boxShadow: '13px 0px 15px rgba(0, 0, 0, 0.25) !important',
    borderBottom: '1px solid #616366',
    borderRadius: '0px 0px 0px 10px',
    '@media only screen and (max-width: 768px)': {
      width: '66px',
      minWidth: '66px',
    }
  },
  lastTableHeaderCell: {
    borderRadius: '0px 10px 0px 0px',
  },
  tableHeader: {
    position: '-webkit-sticky',
    position: 'sticky',
    top: '0',
    zIndex: '2',

    minWidth: '135px',
    height: '110px',
    maxHeight: '110px',
    minHeight: '110px',
    color: '#E52F3A',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '21px',
    textAlign: 'left',
    paddingLeft: '8px',
    paddingRight: '8px',
    background: '#E5E5E5',
    borderLeft: '1px solid #999999',
    borderBottom: '1px solid #999999',
    borderTop: 'none',
    '@media only screen and (max-width: 768px)': {
      minWidth: '100px',
      height: '90px',
      maxHeight: '90px',
      minHeight: '90px',
      fontSize: '12px',
      lineHeight: '17px',
    }
  },
  scrollWrapper: {
    width: '1000px'
  },
  scrollArea: {
    width: '1000px'
  },
  tableHeaderTr: {
    borderRadius: '0px 10px 10px 10px',
  },
  tableCell: {
    height: '40px',
    cursor: 'pointer !important',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '21px',
    textAlign: 'center',
    color: '#2D2D37',
    background: '#D0D0D0',
    border: '1px solid #999999',
    borderRight: 'none !important',
    '@media only screen and (max-width: 768px)': {
      height: '30px',
    }
  },
  moreInfo: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '14px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  cages: {
    cursor: 'pointer',
    '&:hOver': {
      textDecoration: 'underline',
    }
  },
  reserved: {
    fontWeight: '200',
    fontSize: '14px',
    lineHeight: '21px',
    background: '#BCE9C6',
  },
  getCage: {
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '21px',
    background: '#C7F3F3',
    '&:hOver': {
      textDecoration: 'underline',
    }
  },
  out: {
    background: 'white',
  },
  moreInfoButton: {
    background: '#E52F3A',
    boxShadow: '0px 6px 20px rgba(229, 47, 58, 0.4)',
    color: 'white',
    marginTop: '5px',
    '&:hOver': {
      background: '#ea5861',
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
}))
