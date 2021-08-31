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
    resource: null,
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

      item.Unavailabilities.forEach(element => {
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
          Object.assign(value, { [times]: 4 })
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
    const classData = payload.Classes

    classData.sort((a, b) => {
      return moment(a.StartDateTime).diff(moment(b.StartDateTime))
    })
    classData.forEach(item => {
      if (item.Active) {
        const className = item.ClassDescription.Name
        const ClassScheduleId = item.ClassDescription.Id

        if (!value[ClassScheduleId]) {
          value[ClassScheduleId] = []
          endDates[ClassScheduleId] = Date.now()
          startDates[ClassScheduleId] = item.StartDateTime
        }

        const startDate = item.StartDateTime
        const endDate = item.EndDateTime
        moment(endDate).isAfter(moment(endDates[ClassScheduleId])) && (endDates[ClassScheduleId] = endDate)

        value[ClassScheduleId].push({
          'Date': moment(startDate).format('ddd MM/DD/YYYY'),
          'Start Time': `${moment(startDate).format('hh:mm a')}`,
          'Classes': className,
          'LocationId': item.Location.Id,
          'Teacher': `${item.Staff.FirstName} ${item.Staff.LastName}`,
          'Duration': `${moment.duration(moment(endDate).diff(moment(startDate))).asHours()} hours`,
          'IsAvailable': item.IsAvailable,
          'Info': item,
        })

        const flag = text.find(item => item.id === ClassScheduleId)
        !flag && text.push({ name: className, id: ClassScheduleId, info: item})
      }
    })

    let content = text.map(({ name, id, info }) => {
      return {
        text: name,
        id: id,
        info: info,
        value: value[id],
        startDate: moment(startDates[id]).format('ddd MM/DD/YYYY'),
        endDate: moment(endDates[id]).format('ddd MM/DD/YYYY'),
      }
    })

    content.sort((a, b) => {
      if (moment(a.startDate, 'ddd MM/DD/YYYY').isBefore(moment(b.startDate, 'ddd MM/DD/YYYY'))) {
        return -1
      } else {
        return 1
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
