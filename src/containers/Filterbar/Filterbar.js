import React, { useEffect, useState } from 'react'
import useStyles from './styles'
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
import { useMediaQuery } from 'react-responsive'
import { CustomButton } from 'components/CustomButton'

const Filterbar = ({
  title,
  mode,
  tableMode,
  dropContent,
  selectedResource,
  selectResource,
  filterMode,
  setFilterMode,
}) => {
  const classes = useStyles()
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    setSelected(selectedResource + 1)
  }, [selectedResource])

  return (
    <div className={isMobile ? classes.mobileRoot : classes.pageTitleContainer}>
      <h1 className={cx(classes.typo, classes.center)} >
        {mode === 2 && title}
      </h1>
      <div className={classes.selectArea}>
        {
          mode === 2 &&
          <div className={classes.buttonArea}>
            <CustomButton
              className={cx(classes.button, filterMode === 1 && classes.selectedMode)}
              variant='outlined'
              content='Cages'
              onClick={() => setFilterMode(filterMode === 1 ? 0 : 1)}
            />
            <CustomButton
              className={cx(classes.button, filterMode === 2 && classes.selectedMode)}
              variant='outlined'
              content='Lesson'
              onClick={() => setFilterMode(filterMode === 2 ? 0 : 2)}
            />
          </div>
        }
        <div className={classes.center}>
          <CustomDropdown
            dropContent={dropContent}
            tableMode={tableMode}
            onSelect={key => selectResource(key - 1)}
            selected={selected}
          />
        </div>
      </div>
    </div>
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
