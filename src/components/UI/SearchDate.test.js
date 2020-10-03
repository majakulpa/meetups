import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SearchDate from './SearchDate'
import renderer from 'react-test-renderer'

afterEach(cleanup)

test('if renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SearchDate />, div)
})

test('if matches snapshot', () => {
  const tree = renderer.create(<SearchDate />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('if clicking the button calls event handler once', () => {
  const mockHandler = jest.fn()

  const component = render(
    <SearchDate
      placeholder="Search"
      date="10/11/2020"
      searchDateHandleChange={mockHandler}
      handleClearSearch={mockHandler}
    />
  )

  const div = component.getByDisplayValue('10/11/2020')
  fireEvent.click(div)

  expect(div).toHaveTextContent('')
})
