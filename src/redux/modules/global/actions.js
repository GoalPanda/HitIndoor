import { createAction } from 'redux-actions'
import * as CONSTANTS from './constants'

export const getResource = createAction(CONSTANTS.GET_RESOURCE)
export const getAppointment = createAction(CONSTANTS.GET_APPOINTMENT)
export const getClass = createAction(CONSTANTS.GET_CLASS)
export const getClients = createAction(CONSTANTS.GET_CLIENTS)
export const getClassVisits = createAction(CONSTANTS.GET_CLASS_VISITS)
export const getClassDetail = createAction(CONSTANTS.GET_CLASS_DETAIL)
export const getBook = createAction(CONSTANTS.GET_BOOK)
export const getWeekAppointment = createAction(CONSTANTS.GET_APPOINTMENT_BY_WEEK)

export const selectResource = createAction(CONSTANTS.SELECT_RESOURCE)
export const setStartDate = createAction(CONSTANTS.SET_STARTDATE)
export const setViewMode = createAction(CONSTANTS.SET_VIEWMODE)
