import React, { useState, useEffect } from 'react'
import { Mobile, Default } from 'containers/ResponseLayout'
import { Header, MobileHeader } from 'containers/Header'
import { ScheduleTable } from 'containers/ScheduleTable'
import { ClassTable } from 'containers/ClassTable'
import { Toolbar } from 'containers/Toolbar'
import { Filterbar } from 'containers/Filterbar'
import { Container } from '@material-ui/core'
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
  classSelector,
  bookSelector,
} from 'redux/modules/global/selectors'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'
import { bookContent } from 'containers/ScheduleTable/mockup'

const Home = ({
  getResource,
  getAppointment,
  getClass,
  getWeekAppointment,
  selectResource,
  resource,
  appointment,
  classContent,
  weekAppointment,
  selectedResource,
  setViewMode,
  setStartDate,
  getBook,
  book,
}) => {
  const [tableContent, setTableContent] = useState([{ text: 'Loading...', value: {} }])
  const [classTableData, setClassTableData] = useState([])
  const [toolbarMode, setToolbarMode] = useState('today')
  const [tableMode, setTableMode] = useState('day')
  const [openBook, setOpenBook] = useState(false)
  const [date, setDate] = useState(Date.now())
  const [headerMode, setHeaderMode] = useState(2)
  const [dropContent, setDropContent] = useState([{ text: 'All Resources', value: -1 }])
  const [bookItems, setBookItems] = useState([{ text: 'nothing', value: -1 }])
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    getResource()
  }, [getResource])

  useEffect(() => {
    if (resource && headerMode === 2) {
      let initValue = [{ text: 'All Resources', value: -1 }].concat(resource)
      setDropContent(initValue)
    }
  }, [resource, headerMode])

  useEffect(() => {
    if (headerMode === 1) {
      setClassTableData([{ text: '...', value: [] }])
    } else {
      if (tableMode === 'week') {
        const weekStartDate = moment(date).startOf('week')
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
        setTableContent([{ text: 'Loading...', value: {} }])
      }
    }
  }, [date, tableMode, headerMode])

  useEffect(() => {
    if (resource && date && headerMode === 2) {
      const staffIds = resource.map(item => item.value)
      const startDate = moment(date).tz('America/Chicago')
      if (tableMode === 'day') {
        getAppointment({
          body: {
            staffIds,
            startDate,
            endDate: startDate
          }
        })

        const sessionTypeIds = bookContent.map(item => item.value)
        getBook({
          body: {
            sessionTypeIds,
            staffIds,
            startDate,
            endDate: startDate
          }
        })
      } else if (tableMode === 'week') {
        const weekStartDate = moment(date).startOf('week')
        getWeekAppointment({
          body: {
            staffIds,
            startDate: weekStartDate,
            endDate: moment(weekStartDate).add(6, 'days')
          }
        })
      }
    }
  }, [resource, getAppointment, getBook, getWeekAppointment, headerMode, date, tableMode])

  useEffect(() => {
    if (headerMode === 1 && date) {
      const startDate = tableMode === 'day' ? moment(date).tz('America/Chicago') : moment(date).startOf('week')
      const endDate = tableMode === 'day' ? startDate : moment(startDate).add(6, 'days')
      let initValue = [{ text: 'All Resources', value: -1 }]
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
          text: item.value[0].Teacher,
          value: 1
        }
      })
      let initValue = [{ text: 'All Resources', value: -1 }].concat(classDropContent)
      setDropContent(initValue)
    }
  }, [classContent, headerMode])

  useEffect(() => {
    if (weekAppointment.length > 0 && tableMode === 'week') {
      const sel = selectedResource === -1 ? 0 : selectedResource

      const weekStartDate = moment(date).startOf('week')
      let weekData = []
      for (let i = 0; i < 7; i++) {
        let weekDates = moment(weekStartDate).add(i, 'day').format('ddd MM/DD')
        let weekValue = weekAppointment[sel].value[weekDates]
        weekData.push({
          text: weekDates,
          value: weekValue ? weekValue : {}
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

  useEffect(() => {
    if (book.length > 0) {
      setBooks(book)
    }
  }, [book])


  const handleClickGetCage = (time, staffId) => {
    if (books.length > 0) {
      const bookItemRes = books[staffId].sessions[time].map(item => {
        return bookContent.find(ind => ind.value === item)
      })

      const startDateTime = moment(date).format('ddd. MMM  D, YYYY  ') + `${time}`
      setBookItems({
        info: startDateTime,
        mbo_location_id: books[staffId].mbo_location_id,
        name: books[staffId].name,
        staff_id: staffId,
        start_date_time: moment(date).format('YYYY-MM-DDThh:mm:ss+00:00'),
        type: 'Appointment',
        sessions: bookItemRes
      })
      setOpenBook(true)
    }
  }

  const handleClickHeader = (key) => {
    if (tableMode === 'day') {
      selectResource(key)
    } else if (tableMode === 'week') {

    }
  }

  const handleClickMode = (mode) => {
    setToolbarMode(mode)
    setTableMode(mode === 'week' ? 'week' : 'day')
    setViewMode(mode === 'week' ? 'week' : 'day')
  }

  const handleChangeDate = (changedDate) => {
    setDate(changedDate)
    setStartDate(changedDate)
  }

  const handleChangeWeek = (changedDate) => {
    setDate(changedDate)
    setStartDate(changedDate)
    setTableMode('week')
  }

  return (
    <>
      <BookAppointment open={openBook} onClose={() => setOpenBook(false)} bookContent={bookItems} />
      <Mobile>
        <MobileHeader onChanageMode={(val) => setHeaderMode(val)} />
        <Container maxWidth={false}>
          <Toolbar
            title={headerMode === 2 ? 'Select an Appointment' : 'Class Schedule'}
            mode={toolbarMode}
            date={date}
            onClickMode={handleClickMode}
            onChangeDate={handleChangeDate}
            onChangeWeek={handleChangeWeek}
          />
          <Filterbar
            title={moment(date).format('dddd DD/MM/YYYY')}
            mode={headerMode}
            dropContent={dropContent}
          />
          {
            headerMode === 2
              ?
              <ScheduleTable
                mode={tableMode}
                content={tableContent}
                onClikcGetCage={handleClickGetCage}
                onClickHeader={handleClickHeader}
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
            date={date}
            onClickMode={handleClickMode}
            onChangeDate={handleChangeDate}
            onChangeWeek={handleChangeWeek}
          />
          <Filterbar
            title={moment(date).format('dddd DD/MM/YYYY')}
            mode={headerMode}
            dropContent={dropContent}
          />
          {
            headerMode === 2
              ?
              <ScheduleTable
                mode={tableMode}
                content={tableContent}
                onClikcGetCage={handleClickGetCage}
                onClickHeader={handleClickHeader}
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
  appointment: appointmentSelector,
  classContent: classSelector,
  weekAppointment: weekAppointmentSelector,
  selectedResource: selectedResourceSelector,
  book: bookSelector,
})

export default compose(connect(selector, actions))(Home)
