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
import * as cx from 'classnames'

const ClassMoreInfo = ({
  info,
  getClassDetail,
  getClassVisits,
  getClients,
  isClassDetail = false,
}) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [classData, setClassData] = useState({})
  const [clients, setClients] = useState([])

  const handleClick = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const classid = info.Id
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
              setClassData(info)
              setOpen(true)
            }
          })
        } else {
          setIsLoading(false)
          setClassData(info)
          setOpen(true)
        }
      }
    })
  }

  return (
    <>
      <Button
        className={cx(classes.moreInfo, isClassDetail && classes.detail)}
        onClick={handleClick}>{isClassDetail ? 'More Details...' : 'More Info'}
      </Button>

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
          <div className={classes.title}>{info.ClassDescription.Name}</div>
          <Divider />
          <div style={{ display: 'flex', marginTop: '30px' }}>
            {
              isClassDetail &&
              <div style={{ width: '700px' }}>
                <div>
                  {info.ClassDescription.ImageURL &&
                    <img className={classes.background} src={info.ClassDescription.ImageURL} alt='back' />
                  }
                  <div
                    className={classes.content} dangerouslySetInnerHTML={{ __html: info.ClassDescription.Description }}>
                  </div>
                </div>
              </div>
            }
            {
              !isClassDetail &&
              <div style={{ width: '300px', marginLeft: '30px' }}>
                <div className={classes.description}>
                  Reserved: {classData.TotalBooked} Available: {classData.MaxCapacity - classData.TotalBooked}
                </div>
                <br />
                <div className={classes.subtitle}>Booked clients</div>
                {
                  clients.map((item, key) => {
                    return <div className={classes.description} key={key}>{key + 1}. {item}</div>
                  })
                }
              </div>
            }
          </div>
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
