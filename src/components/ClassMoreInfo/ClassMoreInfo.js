import React, { useState } from 'react'
import {
  Dialog,
  Divider,
  Button,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import useStyles from './styles'
import { CustomButton } from 'components/CustomButton'
import { getClassDetail, getClassVisits, getClients } from 'redux/modules/global/actions'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

const ClassMoreInfo = ({
  info,
  getClassDetail,
  getClassVisits,
  getClients,
}) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [classData, setClassData] = useState({})
  const [clients, setClients] = useState([])

  const handleClick = async () => {
    setIsLoading(true)
    await getClassDetail({
      body: {
        startDateTime: info.date,
        endDateTime: info.date,
        classDescriptionId: info.id
      },
      success: async ({ data }) => {
        if (data.Classes.length > 0) {
          const classDetail = data.Classes.find(item => item.ClassScheduleId === info.id)

          if (classDetail) {
            const classid = classDetail.Id
            await getClassVisits({
              body: { classid },
              success: async ({ data }) => {
                const clientIDs = data.Class.Visits.map(item => {
                  return item.ClientId
                })

                if (clientIDs.length > 0) {
                  await getClients({
                    body: { clientIDs },
                    success: ({ data }) => {
                      const clients = data.Clients.map(item => {
                        const duplicated = clientIDs.filter(ele => ele === item.Id)
                        const extedStr = duplicated.length > 1 ? `(${duplicated.length})` : ''

                        return `${item.FirstName} ${item.LastName} ${extedStr}`
                      })
                      setClients(clients)
                      setIsLoading(false)
                      setClassData(classDetail)
                      setOpen(true)
                    }
                  })
                } else {
                  setIsLoading(false)
                  setClassData(classDetail)
                  setOpen(true)
                }
              }
            })

          }
        }
      }
    })
  }

  return (
    <>
      <Button className={classes.moreInfo} onClick={handleClick}>More Info</Button>

      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        className={classes.root}
        scroll='body'
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='xl'
      >
        <div className={classes.paper}>
          <div className={classes.title}>Class Schedule</div>
          <Divider />
          <div className={classes.description}>
            Reserved: {classData.TotalBooked} Available: {classData.MaxCapacity - classData.TotalBooked}
          </div>
          <br />
          <div className={classes.subtitle}>Booked clients</div>
          {
            clients.map((item, key) => {
              return <div className={classes.description}>{key + 1}. {item}</div>
            })
          }
          <div className={classes.buttons}>
            <CustomButton
              content='Close'
              className={classes.close}
              variant='outlined'
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}

ClassMoreInfo.propTypes = {
  getClassDetail: PropTypes.func,
  getClassVisits: PropTypes.func,
  getClients: PropTypes.func,
}

const actions = {
  getClassDetail,
  getClassVisits,
  getClients,
}

export default compose(connect(null, actions))(ClassMoreInfo)
