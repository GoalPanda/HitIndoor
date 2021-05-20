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
  const isMobile = useMediaQuery({ maxWidth: 850 })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    setSelected(selectedResource + 1)
  }, [selectedResource])

  const handleSelect = (key) => {
    if (key === 0) {
      let tmpMode = filterMode

      switch (filterMode) {
        case 0:
        case 2:
          tmpMode = filterMode + 1
          break
        case 1:
        case 3:
          tmpMode = filterMode - 1
          break
        default:
          break
      }

      setFilterMode(tmpMode)
    } else if (key === 1) {
      let tmpMode = filterMode

      switch (filterMode) {
        case 0:
        case 1:
          tmpMode = filterMode + 2
          break
        case 2:
        case 3:
          tmpMode = filterMode - 2
          break
        default:
          break
      }

      setFilterMode(tmpMode)
    }
  }

  return (
    <div className={isMobile ? classes.mobileRoot : classes.pageTitleContainer}>
      <h1 className={cx(classes.typo, classes.center)} >
        {mode === 2 && title}
      </h1>
      <div className={classes.selectArea}>
        {
          mode === 2 && tableMode !== 'week' && 
          <div className={classes.buttonArea}>
            <CustomButton
              className={cx(classes.button, (filterMode === 1 || filterMode === 3) && classes.selectedMode)}
              variant='outlined'
              content='Cages'
              onClick={() => handleSelect(0)}
            />
            <CustomButton
              className={cx(classes.button, (filterMode === 2 || filterMode === 3) && classes.selectedMode)}
              variant='outlined'
              content='Lesson'
              onClick={() => handleSelect(1)}
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
