import { types } from 'mobx-state-tree'

import rcClient from '../utils/rcClient'

const Person = types.model({
  id: types.string,
  firstName: types.string,
  lastName: types.string,
  email: types.string,
  avatar: types.string,
  companyId: types.string,
  creationTime: types.string,
  lastModifiedTime: types.string
})

const PersonStore = types.model({
  persons: types.map(Person)
}).actions(self => ({
  async loadPerson (personId) {
    let person = self.persons.get(personId)
    if (!person) {
      const res = await rcClient.get(`/glip/persons/${personId}`)
      const json = await res.json()
      self.setPerson(personId, json)
      person = self.persons.get(personId)
    }
    return person
  },
  setPerson (personId, person) {
    self.persons.set(personId, person)
  }
}))

const personStore = PersonStore.create({ persons: {} })

export default personStore
