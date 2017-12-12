import { types } from 'mobx-state-tree'
import RcToken from 'ringcentral-ts/Token'

export const Token = types.model({
  appKey: types.string,
  owner: types.string,
  accessToken: types.string,
  type: types.string,
  expiresIn: types.number,
  refreshToken: types.string,
  refreshTokenExpiresIn: types.number,
  scope: types.array(types.string),
  ownerId: types.string,
  endpointId: types.string
})

const TokenStore = types.model({
  token: types.union(Token, types.undefined)
}).views(self => ({
  get () { // return RcToken
    if (self.token) {
      return new RcToken().fromCache(self.token)
    }
  }
})).actions(self => ({
  save (rcToken) { // turn RcToken to MST token
    self.token = Token.create(JSON.parse(JSON.stringify(rcToken)))
  },
  clear () {
    self.token = undefined
  }
}))

const tokenStore = TokenStore.create({})

export default tokenStore
