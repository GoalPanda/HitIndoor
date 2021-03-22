import React from 'react'
import useStyles from './styles'
import { Mobile, Default } from 'containers/ResponseLayout'
import * as cx from 'classnames'
import { CustomDropdown } from 'components/CustomDropdown'
import { dropContent } from 'containers/ScheduleTable/mockup'

const Filterbar = ({
  title,
  mode,
}) => {
  const classes = useStyles()

  return (
    <>
      <Mobile>
        <div className={classes.mobileRoot}>
          <h1 className={cx(classes.typo, classes.center)} >
            {mode === 2 && title}
          </h1>
          <div className={classes.center}>
            <CustomDropdown dropContent={dropContent} />
          </div>
        </div>
      </Mobile>

      <Default>
        <div className={classes.pageTitleContainer}>
          <h1 className={cx(classes.typo, classes.center)} >
            {mode === 2 && title}
          </h1>
          <div className={classes.center}>
            <CustomDropdown dropContent={dropContent} />
          </div>
        </div>
      </Default>
    </>
  )
}

export default Filterbar
