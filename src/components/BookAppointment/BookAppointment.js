import React, { useState } from 'react'
import {
  Dialog,
  Divider,
} from '@material-ui/core'
import useStyles from './styles'
import { CustomDropdown } from 'components/CustomDropdown'
import { CustomButton } from 'components/CustomButton'

const BookAppointment = ({
  open,
  onClose,
  bookContent,
}) => {
  const classes = useStyles()
  const [key, setKey] = useState(0)

  const handleSelect = (ind) => {
    setKey(ind)
  }

  const handleBookClick = () => {
    const session_type_id = bookContent.sessions[key].value
    const cageName = bookContent.sessions[key].text

    const url =
      `https://cart.mindbodyonline.com/sites/29397/cart/add_booking?
item[info]=${bookContent.info}&
item[mbo_location_id]=${bookContent.mbo_location_id}&
item[name]=${cageName}&
item[session_type_id]=${session_type_id}&
item[staff_id]=${bookContent.staff_id}&
item[start_date_time]=${bookContent.start_date_time}&
item[type]=Appointment`

    window.open(url, '_blank')
    onClose()
  }

  if (bookContent.sessions && bookContent.sessions.length === 1) {
    handleBookClick()
  }


  return (
    <>
      <Dialog
        className={classes.root}
        scroll='body'
        open={open}
        onClose={onClose}
        maxWidth='xl'
      >
        <div className={classes.paper}>
          <div className={classes.title}>Book Appointment</div>
          <Divider />
          <div className={classes.description}>*Please call us for Longer Appointments</div>

          <div className={classes.control}>
            <div className={classes.type}>Appointment Type:</div>
            <CustomDropdown dropContent={bookContent.sessions} selected={0} onSelect={handleSelect} />
          </div>
          <div style={{ display: 'flex' }}>
            <div className={classes.buttons}>
              <CustomButton
                content='Book'
                className={classes.book}
                variant='contained'
                onClick={handleBookClick}
              />
            </div>
            <div className={classes.buttons}>
              <CustomButton
                content='Close'
                className={classes.close}
                variant='outlined'
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
export default BookAppointment
