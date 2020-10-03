import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import GoBack from './GoBack'
import renderer from 'react-test-renderer'

afterEach(cleanup)

test('if renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(<GoBack />, div)
})

test('if renders link correctly', () => {
  const { getByText } = render(<GoBack />)
  const linkElement = getByText(/Go back/i)
  expect(linkElement).toBeInTheDocument()
})

test('if matches snapshot', () => {
  const tree = renderer.create(<GoBack />).toJSON()
  expect(tree).toMatchSnapshot()
})
