import React, { useContext } from 'react'
import { GlobalContext } from '../../context/Context'
import { NavLink } from 'react-router-dom'
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
  TiSocialYoutube
} from 'react-icons/ti'

const Footer = () => {
  const { user } = useContext(GlobalContext)

  return (
    <div
      className="bg-gray-700 text-white p-8 flex flex-col justify-between items-center align-center lg:flex-row"
      data-testid="footer"
    >
      <div className="flex items-center flex-col md:flex-row">
        <NavLink to="/meetups/" className="py-2 px-4">
          <img
            src={process.env.PUBLIC_URL + '/assets/logo-white.png'}
            alt="meetups logo"
            width="120"
            height="auto"
          />
        </NavLink>
        <NavLink to="/meetups/" className="hover:underline py-2 px-4">
          <span>Events</span>
        </NavLink>
        <NavLink to="/meetups/groups" className="hover:underline py-2 px-4">
          <span>Groups</span>
        </NavLink>
        {user ? (
          <NavLink to="/meetups/bookings" className="hover:underline py-2 px-4">
            <span>My bookings</span>
          </NavLink>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        <p className="mb-2 mt-5 lg:mt-0 text-center lg:text-right">Follow us</p>
        <div className="flex mb-5 text-2xl justify-center lg:justify-end">
          <TiSocialFacebook className="mx-1 cursor-pointer" />
          <TiSocialInstagram className="mx-1 cursor-pointer" />
          <TiSocialTwitter className="mx-1 cursor-pointer" />
          <TiSocialYoutube className="mx-1 cursor-pointer" />
        </div>
        <hr />
        <span className="text-xs mt-10 md:mt-0">
          &copy; Maja Kulpa-Malecka, 2020
        </span>
      </div>
    </div>
  )
}

export default Footer
