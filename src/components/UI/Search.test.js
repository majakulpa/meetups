import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Search from './Search'
import renderer from 'react-test-renderer'

afterEach(cleanup)

test('if renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Search />, div)
})

test('if matches snapshot', () => {
  const tree = renderer.create(<Search />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('if clicking the button calls event handler once', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Search
      placeholder="Search"
      value="Test"
      searchHandleChange={mockHandler}
      handleClearSearch={mockHandler}
    />
  )

  const div = component.getByPlaceholderText('Search')
  fireEvent.click(div)

  expect(div).toHaveTextContent('')
})
