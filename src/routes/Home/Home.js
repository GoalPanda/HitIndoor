import React, { useState } from 'react'
import { Mobile, Default } from 'containers/ResponseLayout'
import { Header, MobileHeader } from 'containers/Header'
import { ScheduleTable } from 'containers/ScheduleTable'
import { ClassTable } from 'containers/ClassTable'
import { Toolbar } from 'containers/Toolbar'
import { Filterbar } from 'containers/Filterbar'
import { Container } from '@material-ui/core'
import { BookAppointment } from 'components/BookAppointment'
import moment from 'moment'

import { classTypes, TableData } from 'containers/ScheduleTable/mockup'

const Home = () => {
  const [tableContent, setTableContent] = useState(TableData)
  const [toolbarMode, setToolbarMode] = useState('today')
  const [tableMode, setTableMode] = useState('day')
  const [openBook, setOpenBook] = useState(false)
  const [date, setDate] = useState(Date.now())
  const [headerMode, setHeaderMode] = useState(2)

  const handleClickGetCage = (time, cage) => {
    setOpenBook(true)
  }

  const handleClickHeader = (cageKey) => {
    setTableContent([TableData[cageKey]])
  }

  const handleClickMode = (mode) => {
    setToolbarMode(mode)
    setTableMode(mode === 'week' ? 'week' : 'day')
    setTableContent(TableData)
  }

  const handleChangeDate = (changedDate) => {
    setDate(changedDate)
  }

  const handleChangeWeek = (changedDate) => {
    setDate(changedDate)
    setTableMode('week')
    const weekStartDate = moment(changedDate).startOf('week')
    let weekData = []
    for (let i = 0; i < 7; i++) {
      weekData.push({
        text: moment(weekStartDate).add(i, 'day').format('ddd MM/DD'),
        value: {}
      })
    }
    setTableContent(weekData)
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
          <Filterbar title={moment(date).format('dddd DD/MM/YYYY')} mode={headerMode} />
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
          <Filterbar title={moment(date).format('dddd DD/MM/YYYY')} mode={headerMode} />
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

export default Home
