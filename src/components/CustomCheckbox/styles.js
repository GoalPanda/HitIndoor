import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  label: {
    '& > .MuiTypography-root': {
      fontWeight: 'normal !important',
      fontSize: '14px !important',
      lineHeight: '21px !important',
      color: '#616366 !important',
    }
  },
}))
