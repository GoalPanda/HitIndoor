import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { Mobile, Default } from 'containers/ResponseLayout'
import * as cx from 'classnames'
import { CustomDropdown } from 'components/CustomDropdown'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  resourceSelector,
  selectedResourceSelector,
} from 'redux/modules/global/selectors'
import { createStructuredSelector } from 'reselect'
import { selectResource } from 'redux/modules/global/actions'

const Filterbar = ({
  title,
  mode,
  dropContent,
  selectedResource,
  selectResource,
}) => {
  const classes = useStyles()
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    setSelected(selectedResource + 1)
  }, [selectedResource])

  return (
    <>
      <Mobile>
        <div className={classes.mobileRoot}>
          <h1 className={cx(classes.typo, classes.center)} >
            {mode === 2 && title}
          </h1>
          <div className={classes.center}>
            <CustomDropdown
              dropContent={dropContent}
              onSelect={key => selectResource(key - 1)}
              selected={selected}
            />
          </div>
        </div>
      </Mobile>

      <Default>
        <div className={classes.pageTitleContainer}>
          <h1 className={cx(classes.typo, classes.center)} >
            {mode === 2 && title}
          </h1>
          <div className={classes.center}>
            <CustomDropdown
              dropContent={dropContent}
              onSelect={key => selectResource(key - 1)}
              selected={selected}
            />
          </div>
        </div>
      </Default>
    </>
  )
}

Filterbar.propTypes = {
  resource: PropTypes.any,
  selectResource: PropTypes.func,
  selectedResource: PropTypes.any,
}

const actions = {
  selectResource,
}

const selector = createStructuredSelector({
  resource: resourceSelector,
  selectedResource: selectedResourceSelector,
})

export default compose(connect(selector, actions))(Filterbar)
