import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './../../components/UI/Footer'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

const signupForm = ({
  handleSignup,
  newUser,
  handleOnChange,
  passwordShown,
  togglePasswordVisiblity
}) => {
  return (
    <React.Fragment>
      <div className="sp-screen bg-gray-100 py-10">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-sm container p-5 my-5 mx-auto 
            bg-white rounded border-solid border border-gray-200"
        >
          <h2 className="text-center text-3xl font-bold text-purple-600">
            Signup
          </h2>
          <div className="my-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username*
            </label>
            <input
              type="text"
              value={newUser.username}
              onChange={e => handleOnChange('username', e.target.value)}
              name="username"
              id="usernameSignup"
              autoComplete="off"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="my-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Name*
            </label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={e => handleOnChange('name', e.target.value)}
              id="nameSignup"
              autoComplete="off"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="my-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email*
            </label>
            <input
              type="email"
              value={newUser.email}
              onChange={e => handleOnChange('email', e.target.value)}
              name="email"
              id="emailSignup"
              autoComplete="off"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="my-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password*
            </label>
            <div className="relative">
              <input
                type={passwordShown ? 'text' : 'password'}
                name="password"
                value={newUser.password}
                onChange={e => handleOnChange('password', e.target.value)}
                id="passwordSignup"
                autoComplete="off"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:outline-none focus:shadow-outline"
              />
              {newUser.password.length > 0 && newUser.password.length < 6 ? (
                <span className="text-red-600 text-sm font-medium">
                  Password must have at least 6 characters
                </span>
              ) : (
                ''
              )}
              <div
                className="absolute cursor-pointer inset-y-0 right-0 pr-4 mt-2 text-xl"
                onClick={togglePasswordVisiblity}
              >
                {passwordShown ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </div>
            </div>
          </div>

          <div className="my-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              About:
            </label>
            <textarea
              className="ppearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:outline-none focus:shadow-outline"
              value={newUser.description}
              onChange={e => handleOnChange('description', e.target.value)}
              type="text"
              placeholder="Enter description"
              id="descriptionSignup"
            />
          </div>
          <div className="my-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Profile Image URL:
            </label>
            <input
              className="ppearance-none border rounded w-full py-2 px-3 text-gray-700 
                leading-tight focus:text-gray-600 focus:outline-none focus:shadow-outline"
              value={newUser.profileImage}
              onChange={e => handleOnChange('profileImage', e.target.value)}
              type="text"
              placeholder="Enter description"
            />
          </div>

          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white bg-purple-600 
              w-full hover:bg-purple-800 text-white font-bold py-2 px-4 
              rounded rounded focus:outline-none focus:shadow-outline mb-5 mt-4"
            type="submit"
            id="signupButton"
          >
            Signup
          </button>
          <Link
            to="/login"
            className="text-purple-600 hover:text-pruple-800 hover:underline pb-1 text-sm font-bold"
            id="goToLogin"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>

      <Footer />
    </React.Fragment>
  )
}

export default signupForm
