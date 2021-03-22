import React from 'react'
import {
  Checkbox,
  FormControlLabel
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import useStyles from './styles'

const CustomCheckbox = ({
  className,
  label,
  color,
}) => {
  const classes = useStyles()

  const CustomedCheckBox = withStyles(theme => ({
    root: {
      padding: '2px',
      color: '#999999',
      '& .MuiIconButton-label': {
        position: 'relative',
        zIndex: 0,
      },
      '&:not($checked) .MuiIconButton-label:after': {
        content: '""',
        left: 4,
        top: 4,
        height: 15,
        width: 15,
        position: 'absolute',
        backgroundColor: color,
        zIndex: -1
      },
    },
    checked: {
      //color: '#999999 !important',
      color: `${color} !important`,
      '& .MuiIconButton-label': {
        position: 'relative',
        zIndex: 0
      },
      '& .MuiIconButton-label:after': {
        content: '""',
        left: 4,
        top: 4,
        height: 15,
        width: 15,
        position: 'absolute',
        backgroundColor: '#999999',
        zIndex: -1
      }
    }
  }))(Checkbox)

  return (
    <FormControlLabel
      className={classes.label}
      control={<CustomedCheckBox />}
      label={label}
    />

  )
}
export default CustomCheckbox
