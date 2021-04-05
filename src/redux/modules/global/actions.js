import { createAction } from 'redux-actions'
import * as CONSTANTS from './constants'

export const getResource = createAction(CONSTANTS.GET_RESOURCE)
export const getAppointment = createAction(CONSTANTS.GET_APPOINTMENT)
export const getClass = createAction(CONSTANTS.GET_CLASS)
export const getBook = createAction(CONSTANTS.GET_BOOK)
export const getWeekAppointment = createAction(CONSTANTS.GET_APPOINTMENT_BY_WEEK)

export const selectResource = createAction(CONSTANTS.SELECT_RESOURCE)
export const setStartDate = createAction(CONSTANTS.SET_STARTDATE)
export const setViewMode = createAction(CONSTANTS.SET_VIEWMODE)
