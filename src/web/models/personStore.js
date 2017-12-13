import { types, applySnapshot } from 'mobx-state-tree'

import rcClient from '../utils/rcClient'

const Person = types.model({
  id: types.string,
  firstName: types.union(types.string, types.undefined),
  lastName: types.union(types.string, types.undefined),
  email: types.union(types.string, types.undefined),
  avatar: types.union(types.string, types.undefined),
  companyId: types.union(types.string, types.undefined),
  creationTime: types.union(types.string, types.undefined),
  lastModifiedTime: types.union(types.string, types.undefined)
}).views(self => ({
  get loaded () {
    return self.creationTime !== undefined
  }
})).actions(self => ({
  async afterCreate () {
    if (!self.loaded) {
      const res = await rcClient.get(`/glip/persons/${self.id}`)
      const json = await res.json()
      applySnapshot(self, json)
    }
  }
}))

const PersonStore = types.model({
  persons: types.map(Person)
}).views(self => ({
  person (personId) {
    let person = self.persons.get(personId)
    if (!person) {
      person = Person.create({ id: personId })
      self.setPerson(personId, person)
    }
    return person
  }
})).actions(self => ({
  setPerson (personId, person) {
    self.persons.set(personId, person)
  }
}))

const personStore = PersonStore.create({ persons: {} })

export default personStore
