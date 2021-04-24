import React, { useState } from 'react'
import {
  Popper,
  Paper,
  ClickAwayListener,
  Dialog,
} from '@material-ui/core'
import useStyles from './styles'
import { Mobile, Default } from 'containers/ResponseLayout'

const MoreInfo = ({
  info,
  open,
  anchorEl,
  onClose,
}) => {
  const classes = useStyles()
  const [arrowRef, setArrowRef] = useState(null)

  return (
    <>
      <Mobile>
        <Dialog
          className={classes.root}
          scroll='body'
          open={open}
          onClose={onClose}
          maxWidth='xl'
        >
          <Paper elevation={0} className={classes.paper}>
            <div className={classes.contentDiv}>
              <h1 className={classes.title}>{info.title}</h1>
              <img className={classes.background} src={info.ImageUrl} alt='back' />
              <div className={classes.content} dangerouslySetInnerHTML={{ __html: info.Bio }}></div>
            </div>
          </Paper>
        </Dialog>
      </Mobile>
      <Default>
        <Popper
          open={open}
          anchorEl={anchorEl}
          className={classes.popper}
          transition
          placement='bottom'
          disablePortal={false}
          modifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: 'window',
            },
            arrow: {
              enabled: true,
              element: arrowRef,
            },
          }}
        >

          <ClickAwayListener onClickAway={onClose}>
            <Paper elevation={0} className={classes.paper}>
              <span className={classes.arrow} ref={setArrowRef} />
              <div className={classes.contentDiv}>
                <h1 className={classes.title}>{info.title}</h1>
                <div className={classes.center}>
                  <img className={classes.background} src={info.ImageUrl} alt='back' />
                </div>
                <div className={classes.content} dangerouslySetInnerHTML={{ __html: info.Bio }}></div>
              </div>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Default>
    </>
  )
}
export default MoreInfo
