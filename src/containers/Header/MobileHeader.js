import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Drawer,
  LinearProgress,
} from '@material-ui/core'
import useStyles from './MobileHeader.styles.js'
import logo from 'assets/images/logo/logo.svg'
import menuSvg from 'assets/images/icon/menu.svg'
import { useHistory } from 'react-router-dom'
import { NavMenu } from 'containers/NavMenu'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { statusSelector } from 'redux/modules/global/selectors'
import { createStructuredSelector } from 'reselect'

const MobileHeader = ({
  onChanageMode,
  status,
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
        {status === 'PENDING' && <LinearProgress className={classes.loader} />}
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

MobileHeader.propTypes = {
  status: PropTypes.any,
}

const selector = createStructuredSelector({
  status: statusSelector,
})

export default compose(connect(selector, null))(MobileHeader)
