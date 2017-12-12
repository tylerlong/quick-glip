import { types } from 'mobx-state-tree'

import rcClient from '../utils/rcClient'

export const Attachment = types.model({
  id: types.string,
  type: types.string,
  contentUri: types.string,
  name: types.string
})

export const Post = types.model({
  id: types.string,
  groupId: types.string,
  type: types.enumeration(['TextMessage', 'PersonJoined', 'PersonsAdded']),
  text: types.union(types.string, types.null),
  attachments: types.union(types.array(Attachment), types.null),
  creatorId: types.string,
  addedPersonIds: types.union(types.array(types.string), types.null),
  creationTime: types.string,
  lastModifiedTime: types.string
})

const PostStore = types.model({
  posts: types.array(Post)
}).views(self => ({
  get list () {
    return self.posts.map(post => post.text || post.type)
  }
})).actions(self => ({
  async load (groupId) {
    const res = await rcClient.get('/glip/posts', { groupId })
    const json = await res.json()
    self.set(json.records)
  },
  set (posts) {
    self.posts = posts
  }
}))

const postStore = PostStore.create({ posts: [] })

export default postStore
