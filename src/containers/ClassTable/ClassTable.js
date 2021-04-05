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
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const tableHeader = [
  { text: 'Date', value: 1 },
  { text: 'Start Time', value: 2 },
  { text: 'Classes', value: 3 },
  { text: 'Teacher', value: 4 },
  { text: 'Duration', value: 5 },
]

const ClassTable = ({
  content,
}) => {
  const classes = useStyles()
  const [scrollWidth, setScrollWidth] = useState(10000)
  const [contentAreaWidth, setContentAreaWidth] = useState(null)

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

  const handleClickSignup = () => {
  }

  return (
    <div className={classes.root} id='table-area'>
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
                    <Accordion key={key}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className={classes.classHeading}>{item.text}</div>
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
                                                {contentItem[ind]}
                                                {
                                                  key1 === 1 &&
                                                  <CustomButton
                                                    content='Sign Up'
                                                    className={classes.signupButton}
                                                    variant='contained'
                                                    onClick={handleClickSignup}
                                                  />
                                                }
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

export default ClassTable
