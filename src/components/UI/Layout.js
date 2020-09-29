import React from 'react'
import Footer from './Footer'
import GoBack from './GoBack'

const layout = ({ content }) => {
  return (
    <React.Fragment>
      <div
        className="justify-center w-full bg-gray-100
         border-t border-gray-200 sp-screen"
      >
        <GoBack />
        <div className="justify-center sm:p-1 md:p-2 lg:px-48 lg:pt-5 lg:pb-16 xl:px-64">
          {content}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default layout
