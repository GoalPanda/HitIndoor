import defaultTheme from "./default"
import 'typeface-poppins'

import { createMuiTheme } from "@material-ui/core"

const overrides = {
  typography: {
    fontFamily: 'Poppins',
  },
}

export default {
  default: createMuiTheme({ ...defaultTheme, ...overrides }),
}
