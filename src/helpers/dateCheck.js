import moment from 'moment-timezone'

const isBusinessTime = (dayOfWeek, curTime) => {
  const today = moment(Date.now()).tz('America/Chicago').format('YYYY/MM/DD H:mm')

  if (moment(curTime).isBefore(moment(today, 'YYYY/MM/DD H:mm'))) {
    return true
  }
  if (dayOfWeek === 'Sun' || dayOfWeek === 'Sat') {
    if (moment(curTime).isAfter(moment(curTime).set({ h: '19', m: '00' }))) {
      return true
    }
  }
  else {
    if (moment(curTime).isBefore(moment(curTime).set({ h: '11', m: '30' }))) {
      return true
    }
  }
  return false
}

export {
  isBusinessTime,
}