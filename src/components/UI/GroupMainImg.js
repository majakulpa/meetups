import React from 'react'

const groupMainImg = ({ image, name }) => {
  return (
    <React.Fragment>
      {!image ? (
        <div className="w-full h-40 bg-gray-800">
          <h3 className="capitalize text-white text-5xl font-medium p-3">
            {name}
          </h3>
        </div>
      ) : (
        <div
          className="w-full h-40 bg-cover bg-center flex flex-col justify-end"
          style={{
            backgroundImage: `linear-gradient(
              to bottom,
              rgba(0,0,0, 0),
              rgba(0,0,0, 100)
            ), url(${image}})`
          }}
          title="Group main image"
        >
          <h3 className="capitalize text-white text-5xl font-medium p-3">
            {name}
          </h3>
        </div>
      )}
    </React.Fragment>
  )
}

export default groupMainImg
