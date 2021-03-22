import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Drawer,
} from '@material-ui/core'
import useStyles from './MobileHeader.styles.js'
import logo from 'assets/images/logo/logo.svg'
import menuSvg from 'assets/images/icon/menu.svg'
import { useHistory } from 'react-router-dom'
import { NavMenu } from 'containers/NavMenu'

const MobileHeader = ({
  onChanageMode,
}) => {
  const history = useHistory()
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClick = (url) => () => {
    history.push(url)
  }

  return (
    <>
      <AppBar position='fixed' className={classes.root}>
        <Container maxWidth={false} className={classes.container}>
          <Toolbar className={classes.toolbar} >
            <img className={classes.image} src={logo} alt='logo' onClick={handleClick('/')} />
            <div className={classes.grow} />
            <div className={classes.pin}>
              <IconButton
                onClick={() => setOpen(true)}
                className={classes.button}
              >
                <img src={menuSvg} alt='menu' />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={classes.menu}>
          <NavMenu onClose={() => setOpen(false)} onClick={(val) => onChanageMode(val)} />
        </div>
      </Drawer>
    </>
  )
}

export default MobileHeader
