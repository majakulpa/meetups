import React from 'react'

const bigHeader = () => {
  return (
    <div
      className="text-white text-center hidden md:block md:py-10 lg:py-20 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(
                to bottom,
                rgba(0,0,0, 0.5),
                rgba(0,0,0, 0.7)
              ), url(${process.env.PUBLIC_URL +
                '/assets/group-of-people.jpeg'})`
      }}
    >
      <h1 className="md:text-4xl font-medium">Find your next event</h1>
      <p className="uppercase text-xs md:text-sm">
        Make new friends. Have fun.
      </p>
    </div>
  )
}

export default bigHeader
