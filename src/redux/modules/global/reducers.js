import { handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'
import * as CONSTANTS from './constants'
import moment from 'moment-timezone'

const getInitialState = () => {
  return {
    resource: null,
    appointment: [],
    class: [],
    weekAppointment: [],
    selectedResource: -1,

    selectedDate: Date.now(),
    viewMode: 'day',
    status: 'INIT',
    error: null,
  }
}

export default handleActions({
  [CONSTANTS.GET_RESOURCE]: (state, { payload }) => ({
    ...state,
    status: 'PENDING'
  }),

  [CONSTANTS.SET_STARTDATE]: (state, { payload }) => ({
    ...state,
    selectedDate: payload
  }),

  [CONSTANTS.SET_VIEWMODE]: (state, { payload }) => ({
    ...state,
    viewMode: payload
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
        let type = 2
        if (element.Programs[0].Name === 'Lesson') {
          type = 3
        }
        for (let i = moment(element.StartDateTime)
          ;
          moment(i).isBefore(element.EndDateTime)
          ;
          i = moment(i).add(30, 'minutes')) {
          const times = moment(i).format('h:mm a')
          Object.assign(value, { [times]: type })
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
        staffId: item.Id,
        description: {
          ImageUrl: item.ImageUrl,
          Bio: item.Bio,
          title: `${item.LastName} ${item.FirstName}`
        }
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

  [CONSTANTS.GET_CLASS]: (state, { payload }) => ({
    ...state,
    status: 'PENDING',
    class: []
  }),

  [requestSuccess(CONSTANTS.GET_CLASS)]: (state, { payload }) => {
    let text = []
    let description = []
    let value = []

    payload.ClassSchedules.forEach(item => {
      if (item.IsAvailable === true) {
        const ind = item.ClassDescription.Name
        if (!value[ind]) {
          value[ind] = []
        }
        const startDate = state.viewMode === 'day'
          ? moment(state.selectedDate)
          : moment(state.selectedDate).startOf('week')

        const endDate = state.viewMode === 'day' ? startDate : moment(startDate).add(6, 'days')
        const loopEndDate = moment(endDate).isAfter(item.EndDate) ? item.EndDate : endDate

        for (
          let st = moment(startDate)
          ; moment(st).isBefore(moment(loopEndDate).add(1, 'day'));
          st = moment(st).add(1, 'day')
        ) {

          value[ind].push({
            'Date': moment(st).format('ddd MM/DD/YYYY'),
            'Start Time': `${moment(item.StartTime).format('h:mm a')} CDT`,
            'Classes': ind,
            'Teacher': `${item.Staff.LastName} ${item.Staff.FirstName}`,
            'Duration': `${moment.duration(moment(item.EndTime).diff(moment(item.StartTime))).asHours()} hours`
          })
        }

        text.push(ind)
        description[ind] = item.Id
      }
    })

    const content = text.map(item => {
      return {
        text: item,
        value: value[item],
        description: description[item]
      }
    })

    return ({
      ...state,
      class: content,
      status: requestSuccess(CONSTANTS.GET_CLASS),
      error: null
    })
  },

  [requestFail(CONSTANTS.GET_CLASS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CONSTANTS.GET_CLASS),
    class: [],
    error: payload
  }),

}, getInitialState())
