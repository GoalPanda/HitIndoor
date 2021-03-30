import { get } from 'lodash'

export const globalStateSelector = (state) =>
  get(state, 'global')

export const statusSelector = (state) =>
  get(state, 'global.status', null)

export const resourceSelector = (state) =>
  get(state, 'global.resource', null)

export const appointmentSelector = (state) =>
  get(state, 'global.appointment', null)

export const weekAppointmentSelector = (state) =>
  get(state, 'global.weekAppointment', null)

export const selectedResourceSelector = (state) =>
  get(state, 'global.selectedResource', null)
