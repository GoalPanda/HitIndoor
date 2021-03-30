import { handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'
import * as CONSTANTS from './constants'
import moment from 'moment-timezone'

const getInitialState = () => {
  return {
    resource: null,
    appointment: [],
    weekAppointment: [],
    selectedResource: -1,

    status: 'INIT',
    error: null,
  }
}

export default handleActions({
  [CONSTANTS.GET_RESOURCE]: (state, { payload }) => ({
    ...state,
    status: 'PENDING'
  }),

  [requestSuccess(CONSTANTS.GET_RESOURCE)]: (state, { payload }) => ({
    ...state,
    resource: payload,
    status: requestSuccess(CONSTANTS.GET_RESOURCE),
    error: null
  }),

  [requestFail(CONSTANTS.GET_RESOURCE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CONSTANTS.GET_RESOURCE),
    resource: null,
    error: payload
  }),

  [CONSTANTS.GET_APPOINTMENT]: (state, { payload }) => ({
    ...state,
    status: 'PENDING',
    appointment: []
  }),

  [requestSuccess(CONSTANTS.GET_APPOINTMENT)]: (state, { payload }) => {
    const content = payload.StaffMembers.map(item => {
      let value = {}
      item.Availabilities.forEach(element => {
        for (let i = moment(element.StartDateTime)
          ;
          moment(i).isBefore(element.EndDateTime)
          ;
          i = moment(i).add(30, 'minutes')) {
          const times = moment(i).format('h:mm a')
          Object.assign(value, { [times]: 2 })
        }
      })

      item.Appointments.forEach(element => {
        for (let i = 0; i < element.Duration; i += 30) {
          const times = moment(element.StartDateTime).add(i, 'minutes').format('h:mm a')
          Object.assign(value, { [times]: 1 })
        }
      })

      return {
        text: `${item.LastName} ${item.FirstName}`,
        value,
        staffId: item.Id
      }
    })

    return ({
      ...state,
      appointment: content,
      status: requestSuccess(CONSTANTS.GET_APPOINTMENT),
      error: null
    })
  },

  [requestFail(CONSTANTS.GET_APPOINTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CONSTANTS.GET_APPOINTMENT),
    appointment: [],
    error: payload
  }),

  [CONSTANTS.SELECT_RESOURCE]: (state, { payload }) => ({
    ...state,
    selectedResource: payload
  }),

  [CONSTANTS.GET_APPOINTMENT_BY_WEEK]: (state, { payload }) => ({
    ...state,
    status: 'PENDING',
    weekAppointment: []
  }),

  [requestSuccess(CONSTANTS.GET_APPOINTMENT_BY_WEEK)]: (state, { payload }) => {
    const content = payload.StaffMembers.map(item => {
      let weekValue = []
      item.Availabilities.forEach(element => {
        const weekDate = moment(element.StartDateTime).format('ddd MM/DD')
        let value = weekValue[weekDate] ? weekValue[weekDate] : {}

        for (let i = moment(element.StartDateTime)
          ;
          moment(i).isBefore(element.EndDateTime)
          ;
          i = moment(i).add(30, 'minutes')) {
          const times = moment(i).format('h:mm a')
          Object.assign(value, { [times]: 2 })
        }

        weekValue[weekDate] = value
      })

      item.Appointments.forEach(element => {
        const weekDate = moment(element.StartDateTime).format('ddd MM/DD')
        let value = weekValue[weekDate] ? weekValue[weekDate] : {}

        for (let i = 0; i < element.Duration; i += 30) {
          const times = moment(element.StartDateTime).add(i, 'minutes').format('h:mm a')
          Object.assign(value, { [times]: 1 })
        }

        weekValue[weekDate] = value
      })

      return {
        text: `${item.LastName} ${item.FirstName}`,
        value: weekValue,
        staffId: item.Id
      }
    })

    return ({
      ...state,
      weekAppointment: content,
      status: requestSuccess(CONSTANTS.GET_APPOINTMENT_BY_WEEK),
      error: null
    })
  },

  [requestFail(CONSTANTS.GET_APPOINTMENT_BY_WEEK)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CONSTANTS.GET_APPOINTMENT_BY_WEEK),
    weekAppointment: [],
    error: payload
  }),

}, getInitialState())
