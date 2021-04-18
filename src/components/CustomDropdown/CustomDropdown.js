import React, { useEffect, useState } from 'react'
import {
  Popper,
  Paper,
  ClickAwayListener,
  Button,
  List,
  ListItem,
} from '@material-ui/core'
import useStyles from './styles'
import * as cx from 'classnames'
import svgDownArrow from 'assets/images/icon/down-arrow.svg'

const CustomDropdown = ({
  className,
  dropContent,
  onSelect,
  selected,
  tableMode,
}) => {
  const classes = useStyles()
  const [openDrop, setOpenDrop] = useState(false)
  const [selectedText, setSelectedText] = useState(selected && dropContent[selected].text)
  const [arrowRef, setArrowRef] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    setSelectedText(dropContent[selected].text)
  }, [dropContent, selected])

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget)
    setOpenDrop(!openDrop)
  }

  const handleClose = () => {
    setOpenDrop(false)
  }

  const handleClickItem = (key) => () => {
    if (tableMode === 'week' && key === 0) {
      window.alert('Please click Day to check all resources')
      return
    } 
    onSelect(key)
    setSelectedText(dropContent[key].text)
    handleClose()
  }

  return (
    <>
      <Button
        className={cx(classes.button)}
        endIcon={<img src={svgDownArrow} alt='arrow' />}
        onClick={handleToggle}
      >
        {selectedText}
      </Button>

      <Popper
        open={openDrop}
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

        <ClickAwayListener onClickAway={handleClose}>
          <Paper elevation={0} className={classes.paper}>
            <span className={classes.arrow} ref={setArrowRef} />
            <div>
              <List component='nav' className={classes.dropList}>
                {
                  dropContent.map((item, key) => (
                    <div key={key}>
                      <ListItem
                        button
                        onClick={handleClickItem(key)}
                        className={cx(classes.dropContentList)}
                      >
                        {item.text}
                      </ListItem>
                    </div>
                  ))
                }
              </List>
            </div>
          </Paper>
        </ClickAwayListener>
      </Popper>

    </>
  )
}
export default CustomDropdown
