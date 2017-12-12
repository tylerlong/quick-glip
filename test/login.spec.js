/* eslint-env jest */
import RingCentral from 'ringcentral-ts'

import secret from '../secret.json'

const rc = new RingCentral({
  server: secret.server,
  appKey: secret.appKey,
  appSecret: secret.appSecret
})

describe('authorize', () => {
  test('password authorize', async () => {
    await rc.auth({
      username: secret.username,
      extension: secret.extension,
      password: secret.password
    })
    const token = await rc.getToken()
    expect(token.accessToken).toBeDefined()
    expect(token.accessToken.length > 0).toBe(true)
  })
})
