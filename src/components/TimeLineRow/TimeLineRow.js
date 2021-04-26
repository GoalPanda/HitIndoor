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
          <div className={classes.span}></div>
          {
            TimeLine.map((item, key) => {
              return (
                <tr key={key}>
                  <td className={cx(classes.timeLineCell)}> <div>{item.text}</div></td>
                </tr>
              )
            })
          }
          <div className={cx(classes.span, classes.lastTimeCell)}></div>
        </tbody>
      </table>
    </div >
  )
}
export default TimeLineRow
