import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import PlusButton from './PlusButton'
import renderer from 'react-test-renderer'

afterEach(cleanup)

test('if renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PlusButton />, div)
})

test('if matches snapshot', () => {
  const tree = renderer.create(<PlusButton />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('if clicking the button calls event handler once', () => {
  const mockHandler = jest.fn()

  const component = render(<PlusButton text="Add" click={mockHandler} />)

  const button = component.getByText('Add')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
