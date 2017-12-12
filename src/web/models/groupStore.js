import { types } from 'mobx-state-tree'

import rcClient from '../utils/rcClient'

export const Group = types.model({
  id: types.string,
  type: types.enumeration(['PrivateChat', 'Group', 'Team']),
  isPublic: types.union(types.boolean, types.null),
  name: types.union(types.string, types.null),
  description: types.union(types.string, types.null),
  members: types.array(types.string),
  creationTime: types.string,
  lastModifiedTime: types.string
})

const GroupStore = types.model({
  groups: types.array(Group)
}).views(self => ({
  get list () {
    return self.groups.map(group => group.name || group.id)
  }
})).actions(self => ({
  async load () {
    const res = await rcClient.get('/glip/groups')
    const json = await res.json()
    self.set(json.records)
  },
  set (groups) {
    self.groups = groups
  }
}))

const groupStore = GroupStore.create({ groups: [] })

export default groupStore
