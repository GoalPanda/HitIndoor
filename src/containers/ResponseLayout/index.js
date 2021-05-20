import { useMediaQuery } from 'react-responsive'

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 849 })
  return isMobile ? children : null
}

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 850 })
  return isNotMobile ? children : null
}

export {
  Mobile,
  Default,
}