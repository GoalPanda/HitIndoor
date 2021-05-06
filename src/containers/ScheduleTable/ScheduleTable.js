import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import * as cx from 'classnames'
import { TimeLine } from './mockup'
import { TimeLineRow } from 'components/TimeLineRow'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { useMediaQuery } from 'react-responsive'
import { MoreInfo } from 'components/MoreInfo'
import { CustomButton } from 'components/CustomButton'

let openFlag = false

const ScheduleTable = ({
  content,
  mode,
  onClickHeader,
  onClickGetCage,
  filterMode,
}) => {
  const classes = useStyles()
  const isMobile = useMediaQuery({ maxWidth: 600 })
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMoreInfo, setOpenMoreInfo] = useState(false)
  const [scrollWidth, setScrollWidth] = useState(1000)
  const [moreInfoContent, setMoreInfoContent] = useState({ title: '', content: '' })
  const [overText, setOverText] = useState({ time: null, cage: null })

  const handleClickMoreInfo = (key) => (event) => {
    setMoreInfoContent(content[key].description)
    setAnchorEl(event.currentTarget)
    setOpenMoreInfo(event.currentTarget !== anchorEl ? true : !openMoreInfo)
    openFlag = true
    setTimeout(() => { openFlag = false }, 10)
  }

  const handleClose = () => {
    openFlag === false && setOpenMoreInfo(false)
    openFlag = false
  }

  window.addEventListener('resize', () => {
    setScrollWidth(document.querySelector('#table-area').offsetWidth)
  })

  useEffect(() => {
    setScrollWidth(document.querySelector('#table-area').offsetWidth)
  }, [setScrollWidth])

  const setMouseOverText = (time, cage) => {
    setOverText({ time, cage })
  }

  return (
    <div className={classes.root} id='table-area'>
      <MoreInfo info={moreInfoContent} anchorEl={anchorEl} open={openMoreInfo} onClose={handleClose} />

      <div style={{
        width: `${scrollWidth}px`,
      }}>
        <PerfectScrollbar
          options={{
            useBothWheelAxes: false,
          }}
        >
          <div className={classes.contentTable} style={{ width: `100%`, display: 'flex' }}>
            <div className={cx(classes.timeLineArea, classes.timeLineEffect)}>
              <TimeLineRow />
            </div>
            <table style={{ width: `calc(100% - ${isMobile ? 60 : 80}px)` }}>
              <thead>
                <tr className={classes.tableHeaderTr}>
                  {
                    content.map((item, key) => {
                      let availableHeader = true

                      if (mode !== 'week') {
                        if ((filterMode !== 2 && item.type === 'Cage')
                          || (filterMode !== 1 && item.type === 'Lesson')) {
                          availableHeader = true
                        } else {
                          availableHeader = false
                        }
                      }

                      return (
                        <>
                          {
                            availableHeader ?
                              <th key={key} className={cx(classes.tableHeader,
                                key === (content.length - 1) && classes.lastTableHeaderCell)}>
                                <div
                                  className={cx(classes.cages,
                                    (content.length === 1 || mode === 'week') && classes.bigFont)}
                                  onClick={() => (content.length > 1 && mode !== 'week') && onClickHeader(key)}
                                >
                                  {item.text}
                                </div>
                                <div>
                                  {
                                    mode === 'day' &&
                                    (
                                      content.length === 1
                                        ?
                                        <CustomButton
                                          content='More Info'
                                          className={classes.moreInfoButton}
                                          variant='contained'
                                          onClick={handleClickMoreInfo(key)}
                                          disabled={item.text === 'Loading...' && true}
                                        />
                                        :
                                        (<strong
                                          className={classes.moreInfo}
                                          onClick={handleClickMoreInfo(key)}
                                        >
                                          { isMobile ? 'More Info' : 'Click for more info'}
                                        </strong>)
                                    )
                                  }
                                </div>
                              </th>
                              :
                              null
                          }
                        </>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody>
                <tr>
                  {
                    content.map((item, key) => {
                      let availableHeader = true
                      if (mode !== 'week') {
                        if ((filterMode !== 2 && item.type === 'Cage')
                          || (filterMode !== 1 && item.type === 'Lesson')) {
                          availableHeader = true
                        } else {
                          availableHeader = false
                        }
                      }

                      return (
                        <>
                          {
                            availableHeader
                              ?
                              <td key={key} className={cx(classes.tableCell)}></td>
                              : null
                          }
                        </>
                      )
                    })
                  }
                </tr>
                {
                  TimeLine.map((time, key) => {
                    return (
                      <tr key={key}>
                        {
                          content.map((item, key1) => {
                            let availableHeader = true
                            if (mode !== 'week') {
                              if ((filterMode !== 2 && item.type === 'Cage')
                                || (filterMode !== 1 && item.type === 'Lesson')) {
                                availableHeader = true
                              } else {
                                availableHeader = false
                              }
                            }

                            const value = item.value[time.text]
                            let stateText = ''
                            let stateTextClass = null

                            if (value && value === 1) {
                              stateText = 'Reserved'
                              stateTextClass = classes.reserved
                            } else if (value && value === 2) {
                              stateText = 'Get Cage'
                              stateTextClass = classes.getCage
                            } else if (value && value === 3) {
                              stateText = 'Lesson'
                              stateTextClass = classes.getCage
                            } else if (value && value === 4) {
                              stateText = ''
                              stateTextClass = classes.out
                            }

                            return (
                              <>
                                {
                                  availableHeader ?
                                    <td
                                      key={key1}
                                      className={cx(
                                        classes.tableCell,
                                        stateTextClass,
                                        ((value === 3 || value === 2)
                                        && overText.time === time.text && overText.cage === item.text) && classes.hOver
                                      )}
                                      onClick={() =>
                                        (value === 2 || value === 3) &&
                                        onClickGetCage(mode, item.text, time.text, item.staffId, item.value)
                                      }
                                      onMouseEnter={() => setMouseOverText(time.text, item.text)}
                                      onMouseLeave={() => setMouseOverText(null)}
                                    >
                                      {((value === 3 || value === 2)
                                        && overText.time === time.text && overText.cage === item.text)
                                        ? overText.time
                                        : stateText}
                                    </td>
                                    :
                                    null
                                }
                              </>
                            )
                          })
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  )
}

export default ScheduleTable
