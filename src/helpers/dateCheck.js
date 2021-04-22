import moment from 'moment-timezone'

const isBusinessTime = (dayOfWeek, curTime) => {
  const today = moment(Date.now()).tz('America/Chicago')

  if (moment(curTime).isBefore(moment(today))) {
    return true
  }
  if (dayOfWeek === 'Sun' || dayOfWeek === 'Sat') {
    if (moment(curTime).isAfter(moment(curTime).set({ h: '19', m: '00' }))) {
      return true
    }
  }
  else {
    if (moment(curTime).isBefore(moment(curTime).set({ h: '11', m: '00' }))) {
      return true
    }
  }
  return false
}

export {
  isBusinessTime,
}