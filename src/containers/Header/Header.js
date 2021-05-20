import React from 'react'
import {
  AppBar,
  Toolbar,
  Container,
  LinearProgress,
} from '@material-ui/core'
import useStyles from './Header.styles.js'
import logo from 'assets/images/logo/logo.svg'
import * as cx from 'classnames'
import { useHistory } from 'react-router-dom'
import { CustomButton } from 'components/CustomButton'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { statusSelector } from 'redux/modules/global/selectors'
import { createStructuredSelector } from 'reselect'

const Header = ({
  mode,
  onChanageMode,
  status,
}) => {
  const history = useHistory()
  const classes = useStyles()

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
            <div className={cx(classes.pin, mode === 2 && classes.hightBorder)}>
              <CustomButton
                onClick={() => history.push('/appointment')}
                className={cx(classes.button, mode === 2 && classes.hightButton)}
                content="Appointments"
              />
            </div>
            <div className={cx(classes.pin, mode === 1 && classes.hightBorder)}>
              <CustomButton
                onClick={() => history.push('/class')}
                className={cx(classes.button, mode === 1 && classes.hightButton)}
                content='Classes/Camps'
              />
            </div>
            <div className={cx(classes.pin, mode === 3 && classes.hightBorder)}>
              <CustomButton
                onClick={() => window.open('https://cart.mindbodyonline.com/sites/29397/client/schedules', 'blank')}
                className={cx(classes.button, mode === 3 && classes.hightButton)}
                content="My Schedule"
              />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

Header.propTypes = {
  status: PropTypes.any,
}

const selector = createStructuredSelector({
  status: statusSelector,
})

export default compose(connect(selector, null))(Header)
