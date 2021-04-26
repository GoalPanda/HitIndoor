import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {
    '& > table, th, td': {
      borderCollapse: 'collapse',
    },
  },
  tableHeaderTr: {
    borderRadius: '0px 10px 10px 10px',
  },
  span: {
    height: '20px',
    background: '#616366',
    '@media only screen and (max-width: 768px)': {
      height: '15px',
    }
  },
  timeLineCell: {
    width: '80px',
    height: '40px',
    minHeight: '40px',
    // borderTop: '1px solid white !important',
    color: 'white',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '21px',
    textAlign: 'center',
    background: '#616366',

    '@media only screen and (max-width: 768px)': {
      height: '30px',
      minHeight: '30px',
      width: '66px',
      fontSize: '11px',
      lineHeight: '16px',
    }
  },
  timePin: {
    height: '110px ',
    width: '80px',
    minWidth: '80px',
    borderTop: 'none !important',
    borderBottom: '1px solid white !important',
    fontSize: '20px',
    lineHeight: '30px',
    borderRadius: '10px 0px 0px 0px',

    '@media only screen and (max-width: 768px)': {
      height: '90px ',
      width: '66px',
      minWidth: '66px',
      fontSize: '14px',
      lineHeight: '21px',
    }
  },
  lastTimeCell: {
    borderRadius: '0px 0px 0px 10px',
  },
}))
