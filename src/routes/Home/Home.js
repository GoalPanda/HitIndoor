import React, { useState, useEffect } from 'react'
import { Mobile, Default } from 'containers/ResponseLayout'
import { Header, MobileHeader } from 'containers/Header'
import { ScheduleTable } from 'containers/ScheduleTable'
import { ClassTable } from 'containers/ClassTable'
import { Toolbar } from 'containers/Toolbar'
import { Filterbar } from 'containers/Filterbar'
import {
  Container,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'
import { BookAppointment } from 'components/BookAppointment'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  getResource,
  getAppointment,
  getClass,
  getBook,
  getWeekAppointment,
  selectResource,
  setStartDate,
  setViewMode,
} from 'redux/modules/global/actions'
import {
  resourceSelector,
  appointmentSelector,
  weekAppointmentSelector,
  selectedResourceSelector,
  availableResourceSelector,
  classSelector,
} from 'redux/modules/global/selectors'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'
import { bookContent } from 'containers/ScheduleTable/mockup'
import { useLocation, useHistory } from 'react-router-dom'
import useStyles from './styles.js'

const Home = ({
  getResource,
  getAppointment,
  getClass,
  getWeekAppointment,
  selectResource,
  resource,
  availableResource,
  appointment,
  classContent,
  weekAppointment,
  selectedResource,
  setViewMode,
  setStartDate,
  getBook,
}) => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()

  const [tableContent, setTableContent] = useState([{ text: 'Loading...', value: {}, type: 'Cage' }])
  const [classTableData, setClassTableData] = useState([])
  const [toolbarMode, setToolbarMode] = useState('today')
  const [tableMode, setTableMode] = useState('day')
  const [openBook, setOpenBook] = useState(false)
  const [date, setDate] = useState(moment(Date.now()).format('MM/DD/YYYY'))
  const [headerMode, setHeaderMode] = useState(2)
  const [dropContent, setDropContent] = useState([{ text: 'All Resources', value: -1 }])
  const [bookItems, setBookItems] = useState([{ text: 'nothing', value: -1 }])
  const [cageLoading, setCageLoading] = useState(false)
  const [filterMode, setFilterMode] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const arg_date = params.get('date')
    const arg_button = params.get('btn')
    if (arg_date || arg_button) {
      setDate(moment(arg_date, 'MM/DD/YYYY'))
      setToolbarMode(moment(arg_date, 'MM/DD/YYYY') === moment(Date.now()).format('MM/DD/YYYY') ? 'today' : 'day')
      switch (arg_button) {
        case 'cage':
          setFilterMode(1)
          break
        case 'lesson':
          setFilterMode(2)
          break
        case 'both':
          setFilterMode(3)
          break
        default:
          setFilterMode(0)
          break
      }
      history.push('/')
    }
  }, [location, history])

  useEffect(() => {
    if (headerMode === 1) {
      setToolbarMode('day')
      setDate(prev => moment(prev).add(1, 'day').format('MM/DD/YYYY'))
    }
  }, [headerMode])

  useEffect(() => {
    getResource()
  }, [getResource])

  useEffect(() => {
    if (availableResource && headerMode === 2) {
      let initValue = [{ text: 'All Resources', value: -1 }].concat(availableResource)
      setDropContent(initValue)
    }
  }, [availableResource, headerMode])

  useEffect(() => {
    if (headerMode === 1) {
      setClassTableData([{ text: '...', value: [] }])
    } else {
      if (tableMode === 'week') {
        const weekStartDate = moment(date, 'MM/DD/YYYY').startOf('week')
        let weekData = []
        for (let i = 0; i < 7; i++) {
          let weekDates = moment(weekStartDate).add(i, 'day').format('ddd MM/DD')
          weekData.push({
            text: weekDates,
            value: {}
          })
        }
        setTableContent(weekData)
      } else {
        setTableContent([{ text: 'Loading...', value: {}, type: 'Cage' }])
      }
    }
  }, [date, tableMode, headerMode])

  useEffect(() => {
    if (resource && date && headerMode === 2) {
      const staffIds = resource.map(item => item.value)
      const startDate = date
      if (tableMode === 'day') {
        getAppointment({
          body: {
            staffIds,
            startDate,
            endDate: startDate
          }
        })
      } else if (tableMode === 'week') {
        const weekStartDate = moment(date, 'MM/DD/YYYY').startOf('week').format()
        getWeekAppointment({
          body: {
            staffIds,
            startDate: weekStartDate,
            endDate: moment(weekStartDate).add(6, 'days')
          }
        })
      }
    }
  }, [resource, getAppointment, getWeekAppointment, headerMode, date, tableMode])

  useEffect(() => {
    if (headerMode === 1 && date) {
      const startDate = tableMode === 'day' ? date : moment(date, 'MM/DD/YYYY').startOf('week').format()
      const endDate = tableMode === 'day' ? startDate : moment(startDate).add(6, 'days').format()
      let initValue = [{ text: 'All Classes', value: -1 }]
      setDropContent(initValue)
      getClass({
        body: {
          startDate,
          endDate,
        }
      })
    }
  }, [headerMode, date, tableMode, getClass])

  useEffect(() => {
    if (classContent.length > 0 && headerMode === 1) {
      setClassTableData(classContent)
      const classDropContent = classContent.map(item => {
        return {
          text: item.value[0].Classes,
          value: 1
        }
      })
      let initValue = [{ text: 'All Classes', value: -1 }].concat(classDropContent)
      setDropContent(initValue)
    }
  }, [classContent, headerMode])

  useEffect(() => {
    if (weekAppointment.length > 0 && tableMode === 'week') {
      const sel = selectedResource === -1 ? 0 : selectedResource

      const weekStartDate = moment(date, 'MM/DD/YYYY').startOf('week').format()
      let weekData = []
      for (let i = 0; i < 7; i++) {
        let weekDates = moment(weekStartDate).add(i, 'day').format('ddd MM/DD')
        let weekValue = weekAppointment[sel].value[weekDates]
        const staffId = weekAppointment[sel].staffId
        weekData.push({
          text: weekDates,
          value: weekValue ? weekValue : {},
          staffId,
        })
      }
      setTableContent(weekData)
    }
  }, [weekAppointment, date, selectedResource, tableMode])

  useEffect(() => {
    if (appointment.length > 0 && tableMode === 'day') {
      setTableContent(selectedResource === -1 ? appointment : [appointment[selectedResource]])
    }
  }, [selectedResource, appointment, tableMode])

  const handleClickGetCage = (tableMode, text, time, staffId, availableTimes) => {
    const sessionTypeIds = bookContent.map(item => item.value)
    let startDate
    if (tableMode === 'day') {
      startDate = date
    } else if (tableMode === 'week') {
      startDate = moment(text + moment(date, 'MM/DD/YYYY').format('/YYYY')).format('MM/DD/YYYY')
    }

    setCageLoading(true)
    getBook({
      body: {
        sessionTypeIds,
        staffIds: staffId,
        startDate,
        endDate: startDate
      },
      success: ({ data }) => {
        let bookRes = null

        data.Availabilities.forEach(item => {
          const sessionId = item.SessionType.Id
          const bookableStartTime = item.StartDateTime
          const bookableEndTime = item.BookableEndDateTime
          if (!bookRes) {
            bookRes = {
              sessions: [],
              mbo_location_id: item.Location.Id,
            }
          }

          for (
            let st = moment(bookableStartTime)
            ; moment(st).isBefore(moment(bookableEndTime).add(30, 'minute'));
            st = moment(st).add(30, 'minute')
          ) {
            const stime = moment(st).format('h:mm a')
            if (!bookRes.sessions[stime]) {
              bookRes.sessions[stime] = []
            }

            bookRes.sessions[stime].push(sessionId)
          }
        })

        let bookItemRes = []

        bookRes.sessions[time].forEach(timeItem => {
          const sessionItem = bookContent.find(ind => ind.value === timeItem)

          let ableFlag = true
          for (let i = 0; i < sessionItem.duration; i++) {
            let st = moment(time, 'h:mm a').add(i * 30, 'minute').format('h:mm a')
            if (availableTimes[st] === 1 || availableTimes[st] === 4 || !availableTimes[st]) {
              ableFlag = false
              break
            }
          }

          if (ableFlag === true) {
            bookItemRes.push(sessionItem)
          }
        })

        const startDateTime = moment(date, 'MM/DD/YYYY').format('ddd. MMM  D, YYYY  ') + `${time}`
        setBookItems({
          info: startDateTime,
          mbo_location_id: bookRes.mbo_location_id,
          staff_id: staffId,
          start_date_time: moment(date, 'MM/DD/YYYY').format('YYYY-MM-DDT') + moment(time, 'h:mm a').format('hh:mm:00'),
          type: 'Appointment',
          sessions: bookItemRes
        })

        setCageLoading(false)
        setOpenBook(true)
      },
      fail: (err) => {
        setCageLoading(false)
      }
    })
  }

  const handleClickHeader = (key) => {
    if (tableMode === 'day') {
      selectResource(key)
    } else if (tableMode === 'week') {

    }
  }

  const handleClickMode = (mode) => {
    if (mode === 'week' && selectedResource === -1) {
      return
    }
    setToolbarMode(mode)
    setTableMode(mode === 'week' ? 'week' : 'day')
    setViewMode(mode === 'week' ? 'week' : 'day')
  }

  const handleChangeDate = (changedDate) => {
    setDate(moment(changedDate).format('MM/DD/YYYY'))
    setStartDate(changedDate)
  }

  const handleChangeWeek = (changedDate) => {
    if (selectedResource === -1) {
      window.alert('Please select one resource to go the weekly view.')
      return
    }
    setDate(moment(changedDate).format('MM/DD/YYYY'))
    setStartDate(changedDate)
    setTableMode('week')
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={cageLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {
        openBook &&
        <BookAppointment open={true} onClose={() => setOpenBook(false)} bookContent={bookItems} />
      }
      <Mobile>
        <MobileHeader onChanageMode={(val) => setHeaderMode(val)} />
        <Container maxWidth={false}>
          <Toolbar
            title={headerMode === 2 ? 'Select an Appointment' : 'Class Schedule'}
            mode={toolbarMode}
            headerMode={headerMode}
            date={date}
            onClickMode={handleClickMode}
            onChangeDate={handleChangeDate}
            onChangeWeek={handleChangeWeek}
          />
          <Filterbar
            title={moment(date).format('dddd MM/DD/YYYY')}
            mode={headerMode}
            tableMode={tableMode}
            dropContent={dropContent}
            filterMode={filterMode}
            setFilterMode={(value) => {
              setFilterMode(value)
              selectResource(-1)
            }}
          />
          {
            headerMode === 2
              ?
              <ScheduleTable
                mode={tableMode}
                content={tableContent}
                onClickGetCage={handleClickGetCage}
                onClickHeader={handleClickHeader}
                filterMode={filterMode}
              />
              :
              <ClassTable content={classTableData} />
          }
        </Container>
      </Mobile>

      <Default>
        <Header mode={headerMode} onChanageMode={(val) => setHeaderMode(val)} />
        <Container maxWidth={false}>
          <Toolbar
            title={headerMode === 2 ? 'Select an Appointment' : 'Class Schedule'}
            mode={toolbarMode}
            headerMode={headerMode}
            date={date}
            onClickMode={handleClickMode}
            onChangeDate={handleChangeDate}
            onChangeWeek={handleChangeWeek}
          />
          <Filterbar
            title={moment(date).format('dddd MM/DD/YYYY')}
            mode={headerMode}
            tableMode={tableMode}
            dropContent={dropContent}
            filterMode={filterMode}
            setFilterMode={(value) => {
              setFilterMode(value)
              selectResource(-1)
            }}
          />
          {
            headerMode === 2
              ?
              <ScheduleTable
                mode={tableMode}
                content={tableContent}
                onClickGetCage={handleClickGetCage}
                onClickHeader={handleClickHeader}
                filterMode={filterMode}
              />
              :
              <ClassTable content={classTableData} />
          }
        </Container>
      </Default>
    </>
  )
}

Home.propTypes = {
  getResource: PropTypes.func,
  getAppointment: PropTypes.func,
  getClass: PropTypes.func,
  getBook: PropTypes.func,
  getWeekAppointment: PropTypes.func,
  selectResource: PropTypes.func,
  setViewMode: PropTypes.func,
  setStartDate: PropTypes.func,
  resource: PropTypes.any,
  appointment: PropTypes.any,
  classContent: PropTypes.any,
  weekAppointment: PropTypes.any,
  selectedResource: PropTypes.any,
  book: PropTypes.any,
}

const actions = {
  getResource,
  getAppointment,
  getClass,
  getWeekAppointment,
  selectResource,
  setViewMode,
  setStartDate,
  getBook,
}

const selector = createStructuredSelector({
  resource: resourceSelector,
  availableResource: availableResourceSelector,
  appointment: appointmentSelector,
  classContent: classSelector,
  weekAppointment: weekAppointmentSelector,
  selectedResource: selectedResourceSelector,
})

export default compose(connect(selector, actions))(Home)
