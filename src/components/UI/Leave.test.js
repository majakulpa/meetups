import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import Leave from './Leave'
import renderer from 'react-test-renderer'

afterEach(cleanup)

test('if renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Leave />, div)
})

test('if matches snapshot', () => {
  const tree = renderer.create(<Leave />).toJSON()
  expect(tree).toMatchSnapshot()
})
