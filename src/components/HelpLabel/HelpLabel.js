import React from 'react'
import useStyles from './styles'

const HelpLabel = ({
  label,
  color,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.label}>
        <div style={{
          backgroundColor: color,
          border: '1px solid #999999',
          borderRadius: '2px',
          width: '15px',
          height: '15px',
        }}></div>
      </div>
      <div className={classes.content}>{label}</div>
    </div>
  )
}
export default HelpLabel
