import { createAction } from 'redux-actions'
import * as CONSTANTS from './constants'

export const getResource = createAction(CONSTANTS.GET_RESOURCE)
export const getAppointment = createAction(CONSTANTS.GET_APPOINTMENT)
export const getWeekAppointment = createAction(CONSTANTS.GET_APPOINTMENT_BY_WEEK)

export const selectResource = createAction(CONSTANTS.SELECT_RESOURCE)
