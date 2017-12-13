import { types } from 'mobx-state-tree'

import rcClient from '../utils/rcClient'
import postStore from './postStore'

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
  groups: types.array(Group),
  loading: false
}).views(self => ({
  get list () {
    return self.groups.map(group => group.name || group.id)
  }
})).actions(self => ({
  async load () {
    self.setLoading(true)
    const res = await rcClient.get('/glip/groups')
    const json = await res.json()
    self.setGroups(json.records)
    self.setLoading(false)
    postStore.load(self.groups[0].id)
  },
  setGroups (groups) {
    self.groups = groups
  },
  setLoading (loading) {
    self.loading = loading
  }
}))

const groupStore = GroupStore.create({ groups: [] })

export default groupStore
