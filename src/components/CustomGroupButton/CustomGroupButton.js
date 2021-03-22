import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import useStyles from './styles'
import * as cx from 'classnames'

const CustomGroupButton = ({
  className,
  content,
  onClick,
}) => {
  const classes = useStyles()

  const handleLeftClick = () => {
    onClick('prev')
  }

  const handleRightClick = () => {
    onClick('next')
  }

  return (
    <ButtonGroup className={cx(classes.buttonGroup, className)}>
      <Button className={cx(classes.arrow, className)} onClick={handleLeftClick}>
        <ArrowLeftIcon />
      </Button>

      <Button className={cx(classes.button, className)} onClick={() => onClick('main')}>
        {content}
      </Button>

      <Button className={cx(classes.arrow, className)} onClick={handleRightClick}>
        <ArrowRightIcon />
      </Button>

    </ButtonGroup>
  )
}
export default CustomGroupButton
