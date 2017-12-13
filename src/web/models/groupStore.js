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
}).views(self => ({
  get title () {
    return self.name || self.id
  }
}))

const GroupStore = types.model({
  groups: types.array(Group),
  loading: false
}).actions(self => ({
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
  },
  afterCreate () {
    const subscription = rcClient.createSubscription()
    subscription.onMessage(message => {
      const event = message.body
      if (event.creatorId == null) {
        return // todo: why are there post without creatorid ?
      }
      if (event.groupId === postStore.groupId) { // current group
        postStore.loadPosts()
      }
      // other group
    })
    subscription.subscribe(['/glip/posts'])
  }
}))

const groupStore = GroupStore.create({ groups: [] })

export default groupStore
