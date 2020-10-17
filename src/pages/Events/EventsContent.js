import React from 'react'
import SearchDate from '../../components/UI/SearchDate'
import Footer from '../../components/UI/Footer'
import EventCards from '../../components/Event/EventCards'
import BigHeader from '../../components/UI/BigHeader'
import SearchHeader from '../../components/UI/SearchHeader'

const eventsContent = ({
  searchResult,
  searchHandleChange,
  handleClearSearch,
  user,
  dateSearchResult,
  click,
  showAllEvents,
  searchDateHandleChange,
  events
}) => {
  return (
    <React.Fragment>
      <div className="sp-screen" data-testid="eventContent">
        <BigHeader />
        <SearchHeader
          value={searchResult}
          searchHandleChange={searchHandleChange}
          placeholder="Search by event name or location"
          handleClearSearch={handleClearSearch}
          user={user}
          link="/meetups/create-event"
          create="Create Event"
        />
        <div
          className="flex flex-wrap justify-center w-full bg-gray-100 pb-10
         sm:p-1 md:p-2 lg:px-48 lg:py-8 xl:px-64 border-t border-gray-200"
        >
          <div
            className="w-full flex flex-col-reverse md:flex-row
          rounded border-solid border border-gray-200 bg-white overflow-hidden mb-3 p-3"
          >
            <div className="md:w-2/3 lg:w-3/4">
              <ul className="font-normal">
                <EventCards events={events} />
              </ul>
            </div>
            <div
              className="mb-5 md:ml-5 md:mt-8 md:w-1/3 lg:w-1/4 flex
             justify-between md:justify-start md:flex-col events-buttons"
            >
              <button
                onClick={click}
                className="bg-gray-500 hover:bg-gray-600 text-white md:w-full capitalize
              py-2 px-4 rounded focus:outline-none md:mb-5"
                id="freeEvents"
              >
                {showAllEvents ? 'free events' : 'all events'}
              </button>
              <div>
                <SearchDate
                  date={dateSearchResult}
                  searchDateHandleChange={searchDateHandleChange}
                  handleClearSearch={handleClearSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default eventsContent
