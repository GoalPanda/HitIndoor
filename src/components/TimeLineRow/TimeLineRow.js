import React from 'react'
import useStyles from './styles'
import * as cx from 'classnames'
import { TimeLine } from 'containers/ScheduleTable/mockup'

const TimeLineRow = ({
  className,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <table>
        <tbody>
          <tr className={classes.tableHeaderTr}>
            <td className={cx(classes.timeLineCell, classes.timePin)}>Time</td>
          </tr>
          {
            TimeLine.map((item, key) => {
              return (
                <tr key={key}>
                  <td className={cx(classes.timeLineCell,
                    key === (TimeLine.length - 1) && classes.lastTimeCell)}>{item.text}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
export default TimeLineRow
