import { handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'
import * as CONSTANTS from './constants'
import moment from 'moment-timezone'
import { isBusinessTime } from 'helpers/dateCheck'

const getInitialState = () => {
  return {
    resource: null,
    availableResource: null,
    appointment: [],
    class: [],
    weekAppointment: [],
    selectedResource: -1,

    selectedDate: moment(Date.now()).format('MM/DD/YYYY'),
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

          const dayOfWeek = moment(i).format('ddd')
          if (isBusinessTime(dayOfWeek, i) === true) {
            continue
          }

          const times = moment(i).format('h:mm a')
          Object.assign(value, { [times]: type })
        }
      })

      item.Unavailabilities.forEach(element => {
        for (let i = moment(element.StartDateTime)
          ;
          moment(i).isBefore(element.EndDateTime)
          ;
          i = moment(i).add(30, 'minutes')) {
          const dayOfWeek = moment(i).format('ddd')
          if (isBusinessTime(dayOfWeek, i) === true) {
            continue
          }
          const times = moment(i).format('h:mm a')
          Object.assign(value, { [times]: 4 })
        }
      })

      item.Appointments.forEach(element => {
        for (let i = 0; i < element.Duration; i += 30) {
          const times = moment(element.StartDateTime).add(i, 'minutes').format('h:mm a')
          Object.assign(value, { [times]: 1 })
        }
      })

      return {
        text: `${item.FirstName} ${item.LastName}`,
        value,
        type: item.Email ? 'Lesson' : 'Cage',
        staffId: item.Id,
        description: {
          ImageUrl: item.ImageUrl,
          Bio: item.Bio,
          title: `${item.FirstName} ${item.LastName}`
        }
      }
    })

    const availableAppointment = content.filter(item => {
      if (Object.keys(item.value).length > 0) {
        let flag = false
        Object.values(item.value).forEach(valueItem => {
          if (valueItem !== 4) {
            flag = true
            return
          }
        })
        return flag
      } else {
        return false
      }
    })
    const availableResource = availableAppointment.map(item => {
      return state.resource.find(element => element.value === item.staffId)
    })

    return ({
      ...state,
      availableResource,
      appointment: availableAppointment,
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
          const dayOfWeek = moment(i).format('ddd')
          if (isBusinessTime(dayOfWeek, i) === true) {
            continue
          }
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
        text: `${item.FirstName} ${item.LastName}`,
        type: item.Email ? 'Lesson' : 'Cage',
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
    let endDates = []
    let startDates = []
    let value = []

    payload.ClassSchedules.forEach(item => {
      if (item.IsAvailable === true) {
        const className = item.ClassDescription.Name
        const classId = item.ClassDescription.Id
        const location_id = item.Location.Id

        if (!value[classId]) {
          value[classId] = []
          endDates[classId] = Date.now()
          startDates[classId] = item.StartDate
        }
        const startDate = item.StartDate
        const endDate = item.EndDate
        moment(endDate).isAfter(moment(endDates[classId])) && (endDates[classId] = endDate)

        for (
          let st = moment(startDate)
          ; moment(st).isBefore(moment(endDate).add(1, 'day'));
          st = moment(st).add(1, 'day')
        ) {
          value[classId].push({
            'Date': moment(st).format('ddd MM/DD/YYYY'),
            'Start Time': `${moment(item.StartTime).format('hh:mm a')}`,
            'Classes': className,
            'Teacher': `${item.Staff.FirstName} ${item.Staff.LastName}`,
            'Duration': `${moment.duration(moment(item.EndTime).diff(moment(item.StartTime))).asHours()} hours`,
            'LocationId': location_id,
            'Description': item.Id,
          })
        }
        const flag = text.find(item => item.id === classId)
        !flag && text.push({ name: className, id: classId })
      }
    })

    const content = text.map(({ name, id }) => {
      return {
        text: name,
        id: id,
        value: value[id],
        startDate: moment(startDates[id]).format('ddd MM/DD/YYYY'),
        endDate: moment(endDates[id]).format('ddd MM/DD/YYYY'),
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
