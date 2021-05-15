import React, { useState } from 'react'
import useStyles from './styles'
import { CustomButton } from 'components/CustomButton'
import { CustomGroupButton } from 'components/CustomGroupButton'
import { CustomCalendar } from 'components/CustomCalendar'
import { Mobile, Default } from 'containers/ResponseLayout'
import {
  Divider,
  IconButton,
  Popover,
} from '@material-ui/core'
import * as cx from 'classnames'
import { HelpLabel } from 'components/HelpLabel'
import moment from 'moment'
import calendarSvg from 'assets/images/icon/calendar.svg'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers'

const Toolbar = ({
  title,
  mode,
  headerMode,
  date,
  onClickMode,
  onChangeDate,
  onChangeWeek,
}) => {
  const classes = useStyles()
  const [openCalendar, setOpenCalendar] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleChange = (selectedDate) => {
    onChangeDate(selectedDate)
  }

  const handleClickToday = () => {
    onClickMode('today')
    onChangeDate(Date.now())
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenCalendar(false)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpenCalendar(true)
  }


  const handleActionClick = (buttonMode, actionStr) => {
    onClickMode(buttonMode)
    if (buttonMode === 'day') {
      actionStr === 'prev' && onChangeDate(moment(date).subtract(1, 'day'))
      actionStr === 'next' && onChangeDate(moment(date).add(1, 'day'))
      actionStr === 'main' && onChangeDate(moment(date))
    } else if (buttonMode === 'week') {
      actionStr === 'prev' && onChangeWeek(moment(date).subtract(7, 'day'))
      actionStr === 'next' && onChangeWeek(moment(date).add(7, 'day'))
      actionStr === 'main' && onChangeWeek(moment(date))
    }
  }

  return (
    <>
      <Mobile >
        <div className={classes.mobileRoot}>
          <h1 className={cx(classes.typo, classes.center)} >
            {title}
            <IconButton onClick={handleClick}>
              <img src={calendarSvg} alt='cal' />
            </IconButton>
          </h1>

          <Divider className={classes.divider} />
          <div style={{ padding: '10px', display: 'flex' }}>
            <div>
              <CustomButton
                className={cx(classes.mobileButton, mode === 'today' && classes.selectedMode)}
                onClick={handleClickToday}
                variant='outlined'
                content='Today'
              />
            </div>

            <CustomGroupButton
              className={mode === 'day' && classes.selectedMode}
              content='Day'
              onClick={(action) => handleActionClick('day', action)}
            />
            <CustomGroupButton
              className={mode === 'week' && classes.selectedMode}
              content='Week'
              onClick={(action) => handleActionClick('week', action)}
            />
          </div>

          <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <CustomCalendar date={date} onChange={handleChange} />
          </div>
          {
            headerMode === 2 &&
            <div style={{ padding: '17px', display: 'flex' }}>
              <HelpLabel label='Available Times' color='#C7F3F3' />
              <HelpLabel label='Unavailable Times' color='#BCE9C6' />
            </div>
          }
        </div>
      </Mobile>

      <Default>
        <div className={classes.pageTitleContainer}>
          <h1 className={cx(classes.typo, classes.center)} >
            {title}
            <IconButton onClick={handleClick} >
              <img src={calendarSvg} alt='cal' />
            </IconButton>
          </h1>
          <div className={classes.center}>
            {
              headerMode === 2 &&
              <div className={classes.checkboxArea}>
                <HelpLabel label='Available Times' color='#C7F3F3' />
                <HelpLabel label='Unavailable Times' color='#BCE9C6' />
              </div>
            }

            <CustomButton
              className={cx(classes.button, mode === 'today' && classes.selectedMode)}
              variant='outlined'
              content='Today'
              onClick={handleClickToday}
            />
            <CustomGroupButton
              className={mode === 'day' && classes.selectedMode}
              content='Day'
              onClick={(action) => handleActionClick('day', action)}
            />
            <CustomGroupButton
              className={mode === 'week' && classes.selectedMode}
              content='Week'
              onClick={(action) => handleActionClick('week', action)}
            />

            <CustomCalendar date={date} onChange={handleChange} />

          </div>
        </div>
      </Default>

      <Popover
        open={openCalendar}
        anchorEl={anchorEl}
        className={classes.popper}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              variant="static"
              openTo="date"
              value={date}
              onChange={handleChange}
            />
          </MuiPickersUtilsProvider>
        </div>
      </Popover>
    </>
  )
}

export default Toolbar
