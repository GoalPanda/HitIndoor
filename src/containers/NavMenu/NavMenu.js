import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Container,
} from '@material-ui/core'
import useStyles from './NavMenu.styles.js'
import logo from 'assets/images/logo/logo.svg'
import { useHistory } from 'react-router-dom'

const content = [
  { text: 'Classes/Camps', url: '/class' },
  { text: 'Appointments', url: '/appointment' },
]

const NavMenu = ({
  onClose,
  onClick,
}) => {
  const history = useHistory()
  const classes = useStyles()

  const handleClick = (url) => () => {
    onClose()
    history.push(url)
  }

  return (
    <Container>
      <img className={classes.logo} onClick={() => history.push('/')} src={logo} alt='logo' />

      <List component='nav' className={classes.linkList}>
        {
          content.map((item, key) => {
            return (
              <ListItem button key={key} component='a' className={classes.linkItem} >
                <ListItemText
                  primary={item.text}
                  className={classes.linkText}
                  onClick={handleClick(item.url)}
                />
              </ListItem>
            )
          })
        }
      </List>
    </Container>
  )
}

export default NavMenu
