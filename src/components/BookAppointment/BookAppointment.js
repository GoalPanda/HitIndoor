import React from 'react'
import {
  Dialog,
  Divider,
} from '@material-ui/core'
import useStyles from './styles'
import { CustomDropdown } from 'components/CustomDropdown'
import { CustomButton } from 'components/CustomButton'

const dropContent = [
  { text: '30 Min Cage', value: '1' },
  { text: '60 Min Cage', value: '2' },
  { text: '90 Min Cage', value: '3' },
  { text: '120 Min Cage', value: '4' },
]

const BookAppointment = ({
  open,
  onClose,
}) => {
  const classes = useStyles()

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
            <CustomDropdown dropContent={dropContent} />
          </div>
          <div style={{ display: 'flex' }}>
            <div className={classes.buttons}>
              <CustomButton
                content='Book'
                className={classes.book}
                variant='contained'
              />
            </div>
            <div className={classes.buttons}>
              <CustomButton
                content='Close'
                className={classes.close}
                variant='outlined'
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
export default BookAppointment
