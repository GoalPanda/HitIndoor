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
  const [filteredAppointment, setFilteredAppointment] = useState([])

  useEffect(() => {
    const path = location.pathname.slice(1)
    switch (path) {
      case 'class':
        setHeaderMode(1)
        break
      case 'appointment':
        setHeaderMode(2)
        break
      case 'btn=cage':
        setFilterMode(1)
        break
      case 'btn=lesson':
        setFilterMode(2)
        break
      case 'btn=both':
        setFilterMode(3)
        break
      default:
        history.push('/')
        break
    }
    // history.push('/')
  }, [location, history])

  useEffect(() => {
    if (headerMode === 2) {
      setToolbarMode('today')
      setDate(moment(Date.now()).format('MM/DD/YYYY'))
      setTableMode('day')
      getResource()
    }
  }, [headerMode, getResource])

  useEffect(() => {
    if (availableResource && headerMode === 2) {
      let initValue = [{ text: 'All Resources', value: -1 }].concat(availableResource)
      setDropContent(initValue)
    }
  }, [availableResource, headerMode])

  useEffect(() => {
    setFilteredAppointment(appointment)
  }, [appointment])

  useEffect(() => {
    if (headerMode === 1) {
      setClassTableData([{ text: 'Loading...', value: [] }])
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
    if (headerMode === 1) {
      let initValue = [{ text: 'All Classes', value: -1 }]
      setTableMode('today')
      selectResource(-1)
      setDropContent(initValue)
      getClass({
        body: {
          startDate: moment(Date.now()).subtract(1, 'day'),
          endDate: moment('12/31/2050', 'MM/DD/YYYY'),
        }
      })
    }
  }, [headerMode, getClass, selectResource, setTableMode])

  useEffect(() => {
    if (classContent.length > 0 && headerMode === 1) {
      setClassTableData(classContent)
      const classDropContent = classContent.map(item => {
        return {
          text: item.text,
          value: item.id
        }
      })
      let initValue = [{ text: 'All Classes', value: -1 }].concat(classDropContent)
      setDropContent(initValue)
    }
  }, [classContent, headerMode])

  useEffect(() => {
    if (headerMode === 1 && classContent.length > 0) {
      setClassTableData(selectedResource === -1 ? classContent : [classContent[selectedResource]])
    }
  }, [selectedResource, classContent, headerMode])

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
    if (headerMode === 2 && filteredAppointment.length > 0 && tableMode === 'day') {
      setTableContent(selectedResource === -1 ? filteredAppointment : [filteredAppointment[selectedResource]])
    }
  }, [selectedResource, filteredAppointment, tableMode, filterMode, headerMode])

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
          start_date_time: moment(date, 'MM/DD/YYYY').format('YYYY-MM-DDT') + moment(time, 'h:mm a').format('HH:mm:00'),
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

  const handleSelectFilterMode = (value) => {
    setFilterMode(value)
    selectResource(-1)
    setTableContent(appointment)
    setDropContent([{ text: 'All Resources', value: -1 }].concat(availableResource))
    setFilteredAppointment(appointment)

    let filteredAppointmentTmp
    let filteredResource
    switch (value) {
      case 1:
        filteredAppointmentTmp = appointment.filter(item => item.type === 'Cage')
        filteredResource = availableResource.filter(item => item.type === 'Cage')
        setDropContent([{ text: 'All Resources', value: -1 }].concat(filteredResource))
        setTableContent(filteredAppointmentTmp)
        setFilteredAppointment(filteredAppointmentTmp)
        break
      case 2:
        filteredAppointmentTmp = appointment.filter(item => item.type === 'Lesson')
        filteredResource = availableResource.filter(item => item.type === 'Lesson')
        setDropContent([{ text: 'All Resources', value: -1 }].concat(filteredResource))
        setTableContent(filteredAppointmentTmp)
        setFilteredAppointment(filteredAppointmentTmp)
        break
      default:
        break
    }
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
          {
            headerMode === 2
              ?
              <Toolbar
                title={headerMode === 2 ? 'Select an Appointment' : 'Class Schedule'}
                mode={toolbarMode}
                headerMode={headerMode}
                date={date}
                onClickMode={handleClickMode}
                onChangeDate={handleChangeDate}
                onChangeWeek={handleChangeWeek}
              />
              :
              <div style={{ marginTop: '90px' }}></div>
          }
          <Filterbar
            title={moment(date).format('dddd MM/DD/YYYY')}
            mode={headerMode}
            tableMode={tableMode}
            dropContent={dropContent}
            filterMode={filterMode}
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
                setFilterMode={(value) => handleSelectFilterMode(value)}
              />
              :
              <ClassTable content={classTableData} />
          }
        </Container>
      </Mobile>

      <Default>
        <Header mode={headerMode} onChanageMode={(val) => setHeaderMode(val)} />
        <Container maxWidth={false}>
          {
            headerMode === 2
              ?
              <Toolbar
                title={headerMode === 2 ? 'Select an Appointment' : 'Class Schedule'}
                mode={toolbarMode}
                headerMode={headerMode}
                date={date}
                onClickMode={handleClickMode}
                onChangeDate={handleChangeDate}
                onChangeWeek={handleChangeWeek}
              />
              :
              <div style={{ marginTop: '90px' }}></div>
          }
          <Filterbar
            title={moment(date).format('dddd MM/DD/YYYY')}
            mode={headerMode}
            tableMode={tableMode}
            dropContent={dropContent}
            filterMode={filterMode}
            setFilterMode={(value) => handleSelectFilterMode(value)}
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
