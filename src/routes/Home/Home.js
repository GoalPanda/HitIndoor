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
  getWeekAppointment,
  selectResource,
} from 'redux/modules/global/actions'
import {
  resourceSelector,
  appointmentSelector,
  weekAppointmentSelector,
  selectedResourceSelector,
} from 'redux/modules/global/selectors'
import { classTypes } from 'containers/ScheduleTable/mockup'
import { createStructuredSelector } from 'reselect'
import moment from 'moment-timezone'

const Home = ({
  getResource,
  getAppointment,
  getWeekAppointment,
  selectResource,
  resource,
  appointment,
  weekAppointment,
  selectedResource,
}) => {
  const [tableContent, setTableContent] = useState([{ text: 'Loading...', value: {} }])
  const [toolbarMode, setToolbarMode] = useState('today')
  const [tableMode, setTableMode] = useState('day')
  const [openBook, setOpenBook] = useState(false)
  const [date, setDate] = useState(Date.now())
  const [headerMode, setHeaderMode] = useState(2)

  useEffect(() => {
    getResource()
  }, [getResource])

  useEffect(() => {
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
  }, [date, tableMode])

  useEffect(() => {
    if (resource && date) {
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
  }, [resource, getAppointment, getWeekAppointment, date, tableMode])

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

  const handleClickGetCage = (time, cage) => {
    setOpenBook(true)
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
  }

  const handleChangeDate = (changedDate) => {
    setDate(changedDate)
  }

  const handleChangeWeek = (changedDate) => {
    setDate(changedDate)
    setTableMode('week')
  }

  return (
    <>
      <BookAppointment open={openBook} onClose={() => setOpenBook(false)} />
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
              <ClassTable content={classTypes} />
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
              <ClassTable content={classTypes} />
          }
        </Container>
      </Default>
    </>
  )
}

Home.propTypes = {
  getResource: PropTypes.func,
  getAppointment: PropTypes.func,
  getWeekAppointment: PropTypes.func,
  selectResource: PropTypes.func,
  resource: PropTypes.any,
  appointment: PropTypes.any,
  weekAppointment: PropTypes.any,
  selectedResource: PropTypes.any,
}

const actions = {
  getResource,
  getAppointment,
  getWeekAppointment,
  selectResource,
}

const selector = createStructuredSelector({
  resource: resourceSelector,
  appointment: appointmentSelector,
  weekAppointment: weekAppointmentSelector,
  selectedResource: selectedResourceSelector,
})

export default compose(connect(selector, actions))(Home)
