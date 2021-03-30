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

const doGetWeekAppointment = apiCall({
  type: CONSTANTS.GET_APPOINTMENT_BY_WEEK,
  method: 'post',
  path: 'mind/appointment',
})


export default function* rootSaga() {
  yield takeLatest(CONSTANTS.GET_RESOURCE, doGetResource)
  yield takeLatest(CONSTANTS.GET_APPOINTMENT, doGetAppointment)
  yield takeLatest(CONSTANTS.GET_APPOINTMENT_BY_WEEK, doGetWeekAppointment)
}
