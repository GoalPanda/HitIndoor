import moment from 'moment-timezone'

const isBusinessTime = (dayOfWeek, curTime) => {
  const today = moment.tz(Date.now(), 'America/Chicago').format('YYY/MM/DD H:mm')
  if (moment(curTime).isBefore(moment(today, 'YYY/MM/DD H:mm'))) {
    return true
  }
  if (dayOfWeek === 'Sun' || dayOfWeek === 'Sat') {
    if (moment(curTime).isAfter(moment(curTime).set({ h: '19', m: '00' }))) {
      return true
    }
  }
  else {
    if ((moment(curTime).isBefore(moment(curTime).set({ h: '11', m: '00' })))
      || (moment(curTime).isAfter(moment(curTime).set({ h: '20', m: '30' })))) {
      return true
    }
  }
  return false
}

export {
  isBusinessTime,
}