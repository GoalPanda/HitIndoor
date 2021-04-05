import React from 'react'
import useStyles from './styles'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import calendarSvg from 'assets/images/icon/calendar.svg'

const CustomCalendar = ({
  date,
  onChange,
}) => {
  const classes = useStyles()

  const handleDateChange = (selectedDate) => {
    onChange(selectedDate)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={classes.calendar}
        //disableToolbar
        variant='inline'
        format='dd/MM/yyyy'
        value={date}
        onChange={handleDateChange}
        keyboardIcon={<img src={calendarSvg} alt='calendar' />}
        InputProps={{
          disableUnderline: true,
          placeholder: 'Select DD / MM / YYYY',
          className: classes.calendarInput
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
export default CustomCalendar
