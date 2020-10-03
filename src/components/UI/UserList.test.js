import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import UserList from './UserList'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'

afterEach(cleanup)

let usersArr

beforeEach(() => {
  usersArr = [
    { id: '1', profileImage: 'testImage', name: 'Anna' },
    { id: '2', profileImage: 'testImage', name: 'Alan' }
  ]
})

test('if renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MemoryRouter>
      <UserList usersArr={usersArr} />
    </MemoryRouter>,
    div
  )
})

test('if matches snapshot', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <UserList usersArr={usersArr} />
      </MemoryRouter>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
