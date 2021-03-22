import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from './styles'
import * as cx from 'classnames'

const CustomButton = ({
  className,
  content,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Button
      className={cx(classes.root, className)}
      {...props}
    >
      {content}
    </Button>
  )
}
export default CustomButton
