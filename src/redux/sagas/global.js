import { takeLatest } from 'redux-saga/effects'
import * as CONSTANTS from 'redux/modules/global/constants'
import apiCall from '../api/apiCall'

const doGetResource = apiCall({
  type: CONSTANTS.GET_RESOURCE,
  method: 'get',
  path: 'mind/resource',
})

const doGetAppointment = apiCall({
  type: CONSTANTS.GET_APPOINTMENT,
  method: 'post',
  path: 'mind/appointment',
})

const doGetClass = apiCall({
  type: CONSTANTS.GET_CLASS,
  method: 'post',
  path: 'mind/class-detail',
})

const doGetClassDetail = apiCall({
  type: CONSTANTS.GET_CLASS_DETAIL,
  method: 'post',
  path: 'mind/class-detail',
})

const doGetClassVisits = apiCall({
  type: CONSTANTS.GET_CLASS_VISITS,
  method: 'post',
  path: 'mind/class-visit',
})

const doGetClients = apiCall({
  type: CONSTANTS.GET_CLIENTS,
  method: 'post',
  path: 'mind/clients',
})


const doGetWeekAppointment = apiCall({
  type: CONSTANTS.GET_APPOINTMENT_BY_WEEK,
  method: 'post',
  path: 'mind/appointment',
})

const doGetBook = apiCall({
  type: CONSTANTS.GET_BOOK,
  method: 'post',
  path: 'mind/book',
})

export default function* rootSaga() {
  yield takeLatest(CONSTANTS.GET_RESOURCE, doGetResource)
  yield takeLatest(CONSTANTS.GET_APPOINTMENT, doGetAppointment)
  yield takeLatest(CONSTANTS.GET_CLASS, doGetClass)
  yield takeLatest(CONSTANTS.GET_CLASS_VISITS, doGetClassVisits)
  yield takeLatest(CONSTANTS.GET_CLIENTS, doGetClients)
  yield takeLatest(CONSTANTS.GET_CLASS_DETAIL, doGetClassDetail)
  yield takeLatest(CONSTANTS.GET_APPOINTMENT_BY_WEEK, doGetWeekAppointment)
  yield takeLatest(CONSTANTS.GET_BOOK, doGetBook)
}
