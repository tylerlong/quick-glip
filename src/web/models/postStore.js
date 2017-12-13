import { types } from 'mobx-state-tree'

import rcClient from '../utils/rcClient'

export const Attachment = types.model({
  id: types.string,
  type: types.string,
  contentUri: types.union(types.string, types.undefined),
  name: types.union(types.string, types.undefined)
})

export const Post = types.model({
  id: types.string,
  groupId: types.string,
  type: types.enumeration(['TextMessage', 'PersonJoined', 'PersonsAdded']),
  text: types.union(types.string, types.null),
  attachments: types.union(types.array(Attachment), types.null),
  creatorId: types.union(types.string, types.null),
  addedPersonIds: types.union(types.array(types.string), types.null),
  creationTime: types.string,
  lastModifiedTime: types.string
}).views(self => ({
  get title () {
    return self.text || self.type
  }
}))

const PostStore = types.model({
  posts: types.array(Post),
  groupId: '-1',
  loading: true
}).actions(self => ({
  async loadPosts () {
    const res = await rcClient.get('/glip/posts', { groupId: self.groupId })
    const json = await res.json()
    const records = json.records.filter(item => item.creatorId !== null) // todo: why are there post without creatorId ?
    self.setPosts(records)
  },
  async load (groupId) {
    self.setLoading(true)
    self.setGroupId(groupId)
    await self.loadPosts()
    self.setLoading(false)
  },
  setPosts (posts) {
    self.posts = posts
  },
  setLoading (loading) {
    self.loading = loading
  },
  setGroupId (groupId) {
    self.groupId = groupId
  },
  async createPost (text) {
    await rcClient.post('/glip/posts', { groupId: self.groupId, text })
    await self.loadPosts()
  }
}))

const postStore = PostStore.create({ posts: [] })

export default postStore
