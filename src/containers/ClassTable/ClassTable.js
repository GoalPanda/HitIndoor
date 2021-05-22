import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import * as cx from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { CustomButton } from 'components/CustomButton'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Backdrop,
  CircularProgress,
  Tooltip,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import moment from 'moment-timezone'
import { getClassDetail } from 'redux/modules/global/actions'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { CustomAlert } from 'components/CustomAlert'
import { ClassMoreInfo } from 'components/ClassMoreInfo'

const tableHeader = [
  { text: 'Date', value: 1 },
  { text: 'Start Time', value: 2 },
  { text: 'Classes', value: 3 },
  { text: 'Teacher', value: 4 },
  { text: 'Duration', value: 5 },
]

const ClassTable = ({
  content,
  getClassDetail,
}) => {
  const classes = useStyles()
  const [scrollWidth, setScrollWidth] = useState(10000)
  const [contentAreaWidth, setContentAreaWidth] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  window.addEventListener('resize', () => {
    const area1 = document.querySelector('#table-area')
    const area2 = document.querySelector('#class-table-header')
    area1 && setScrollWidth(area1.offsetWidth)
    area2 && setContentAreaWidth(area2.offsetWidth)
  })

  useEffect(() => {
    setContentAreaWidth(document.querySelector('#class-table-header').offsetWidth)
    setScrollWidth(document.querySelector('#table-area').offsetWidth)
  }, [setScrollWidth, setContentAreaWidth])

  const handleClickSignup = async (key, index) => {
    const curIndexValue = content[key].value[index]

    setIsLoading(true)
    await getClassDetail({
      body: {
        startDateTime: curIndexValue.Date,
        endDateTime: curIndexValue.Date,
        classDescriptionId: curIndexValue.Description
      },
      success: async ({ data }) => {
        setIsLoading(false)
        if (data.Classes.length > 0) {
          const classDetail = data.Classes.find(item => item.ClassScheduleId === curIndexValue.Description)
          if (classDetail.MaxCapacity > classDetail.TotalBooked) {
            const mbo_id = classDetail.Id
            const location_id = curIndexValue.LocationId
            const name = curIndexValue.Classes
            const dateTime = moment(curIndexValue.Date).format('ddd. MMM D, YYYY  ') +
              `${curIndexValue['Start Time']}`

            const url =
              `https://cart.mindbodyonline.com/sites/29397/cart/add_booking?
item[info]=${dateTime}&
item[mbo_id]=${mbo_id}&
item[mbo_location_id]=${location_id}&
item[name]=${name}&
item[type]=Class`

            setTimeout(() => { window.open(url, '_blank') }, 500)
          } else {
            setAlertOpen(true)
          }
        }
      }
    })
  }

  return (
    <div className={classes.root} id='table-area'>
      <CustomAlert
        isOpen={alertOpen}
        type='error'
        text='"This session is currently full !'
        onClose={() => setAlertOpen(false)}
      />

      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div style={{ width: `${scrollWidth}px` }}>
        <PerfectScrollbar
          options={{
            suppressScrollY: true,
            useBothWheelAxes: false,
          }}
        >
          <div className={classes.contentTable}>
            <table style={{ width: '100%' }} id='class-table-header'>
              <thead>
                <tr>
                  {
                    tableHeader.map((item, key) => {
                      return (
                        <th key={key}
                          className={cx(classes.tableHeader,
                            key === (tableHeader.length - 1) && classes.lastTableHeaderCell,
                            key === 0 && classes.firstTableHeaderCell,
                            key === 1 && classes.secondTableCell,
                          )}
                          style={{ width: `${(contentAreaWidth - 680) / 3}px` }}
                        >
                          {item.text}
                        </th>
                      )
                    })
                  }
                </tr>
              </thead>
            </table>

            <div className={classes.classArea} style={{ width: `${contentAreaWidth}px` }}>
              {
                content.map((item, key) => {
                  return (
                    <Accordion key={key} className={classes.accordion}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
                        <div className={classes.classHeading}>
                          {`${item.text}${item.startDate ? ` (${item.startDate})` : ''}`}
                        </div>
                      </AccordionSummary>
                      <AccordionDetails className={classes.detail}>
                        {
                          item.value.length === 0
                            ?
                            <div className={classes.noContent}>No Scheduled Classes or Training Sessions</div>
                            :
                            <table style={{ width: '100%' }}>
                              <tbody>
                                {
                                  item.value.map((contentItem, index) => {
                                    return (
                                      <tr key={index}>
                                        {
                                          tableHeader.map((tbItem, key1) => {
                                            const ind = tbItem.text
                                            return (
                                              <td key={key1}
                                                className={cx(classes.tableCell,
                                                  key1 === 0 && classes.firstTableCell,
                                                  key1 === 1 && classes.secondTableCell,
                                                  key1 === (tableHeader.length - 1) && classes.lastTableCell,
                                                )}
                                                style={{ width: `${(contentAreaWidth - 680) / 3}px` }}
                                              >
                                                <div style={{ display: 'flex' }}>
                                                  {contentItem[ind]}
                                                  {
                                                    key1 === 1 && ' CDT'
                                                  }
                                                  {
                                                    key1 === 1 &&
                                                    <>
                                                      <Tooltip
                                                        title={`${contentItem.Info.TotalBooked} Reserved,
                                                      ${contentItem.Info.MaxCapacity} Open`}
                                                        arrow
                                                      >
                                                        <div className={classes.signupButtonArea}>
                                                          <CustomButton
                                                            content='Sign Up'
                                                            className={classes.signupButton}
                                                            variant='contained'
                                                            onClick={() => handleClickSignup(key, index)}
                                                            disabled={!contentItem.IsAvailable}
                                                          />
                                                        </div>
                                                      </Tooltip>

                                                      <ClassMoreInfo info={contentItem.Info} />
                                                    </>
                                                  }
                                                </div>
                                              </td>
                                            )
                                          })
                                        }
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </table>
                        }
                      </AccordionDetails>
                    </Accordion>
                  )
                })
              }
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </div >
  )
}

ClassTable.propTypes = {
  getClassDetail: PropTypes.func,
}

const actions = {
  getClassDetail,
}

export default compose(connect(null, actions))(ClassTable)
