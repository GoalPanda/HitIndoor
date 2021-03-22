import React from 'react'
import {
  AppBar,
  Toolbar,
  Container,
} from '@material-ui/core'
import useStyles from './Header.styles.js'
import logo from 'assets/images/logo/logo.svg'
import * as cx from 'classnames'
import { useHistory } from 'react-router-dom'
import { CustomButton } from 'components/CustomButton'

const Header = ({
  mode,
  onChanageMode,
}) => {
  const history = useHistory()
  const classes = useStyles()

  const handleClick = (url) => () => {
    history.push(url)
  }

  const handleAnchors = (value) => () => {
    onChanageMode(value)
  }

  return (
    <>
      <AppBar position='fixed' className={classes.root}>
        <Container maxWidth={false} className={classes.container}>
          <Toolbar className={classes.toolbar} >
            <img className={classes.image} src={logo} alt='logo' onClick={handleClick('/')} />
            <div className={classes.grow} />
            <div className={cx(classes.pin, mode === 1 && classes.hightBorder)}>
              <CustomButton
                onClick={handleAnchors(1)}
                className={cx(classes.button, mode === 1 && classes.hightButton)}
                content='Classes/Camps'
              />
            </div>
            <div className={cx(classes.pin, mode === 2 && classes.hightBorder)}>
              <CustomButton
                onClick={handleAnchors(2)}
                className={cx(classes.button, mode === 2 && classes.hightButton)}
                content="Appointments"
              />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Header
