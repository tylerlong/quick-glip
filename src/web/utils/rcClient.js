import RingCentral from 'ringcentral-ts'

import tokenStore from '../models/tokenStore'
import secret from '../../../secret.json'

const rcClient = new RingCentral({
  tokenStore,
  server: secret.server,
  appKey: secret.appKey,
  appSecret: secret.appSecret
})

export default rcClient
