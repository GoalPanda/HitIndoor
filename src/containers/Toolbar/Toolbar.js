import React from 'react'
import useStyles from './styles'
import { CustomButton } from 'components/CustomButton'
import { CustomGroupButton } from 'components/CustomGroupButton'
import { CustomCalendar } from 'components/CustomCalendar'
import { Mobile, Default } from 'containers/ResponseLayout'
import {
  Divider,
} from '@material-ui/core'
import * as cx from 'classnames'
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckbox'
import moment from 'moment'

const Toolbar = ({
  title,
  mode,
  date,
  onClickMode,
  onChangeDate,
  onChangeWeek,
}) => {
  const classes = useStyles()

  const handleChange = (selectedDate) => {
    onChangeDate(selectedDate)
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
          </h1>
          <Divider className={classes.divider} />
          <div style={{ padding: '10px', display: 'flex' }}>
            <div>
              <CustomButton
                className={cx(classes.mobileButton, mode === 'today' && classes.selectedMode)}
                onClick={() => onClickMode('today')}
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

          <div style={{ padding: '17px' }}>
            <CustomCheckbox label='Available Times' color='#C7F3F3' />
            <CustomCheckbox label='Unavailable Times' color='#BCE9C6' />
          </div>

        </div>
      </Mobile>

      <Default>
        <div className={classes.pageTitleContainer}>
          <h1 className={cx(classes.typo, classes.center)} >
            {title}
          </h1>
          <div className={classes.center}>
            <div className={classes.checkboxArea}>
              <div>
                <CustomCheckbox label='Available Times' color='#C7F3F3' />
              </div>
              <div>
                <CustomCheckbox label='Unavailable Times' color='#BCE9C6' />
              </div>
            </div>

            <CustomButton
              className={cx(classes.button, mode === 'today' && classes.selectedMode)}
              variant='outlined'
              content='Today'
              onClick={() => onClickMode('today')}
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
    </>
  )
}

export default Toolbar
