/* eslint-env jest */
import RingCentral from 'ringcentral-ts'

import tokenStore, { Token } from '../src/web/models/tokenStore'
import secret from '../secret.json'

const tokenJson = {
  'appKey': 'eac8797af1b3502F2CEAAEECAC3Ed378AA7858A386656f28A008b0c638A754B1',
  'owner': '16506417402',
  'accessToken': 'SUFEMDFQMDlQQVMwMHxBQURwYUlrX2ZiRnFGNzRRcHB6UzdQeUdIZVYxRVFicjZLM0otYV9zNHVpQlJjcE11Mko2d3djRnhFRUpvZFpWcUN6WU5nVEhXVHo4am54N01VVnFzNHZvZTQ0Q1M5VHdQVlFrTk5HSVFwbzBSd0p3S29HM0dOVUpZTnpJU3N2NW83VjhURjFCRmFGQ2lIajg5aDA3UVJmZ2M1YXF5VXZRd3Flcm9Oc3J1X0I3bDhRa0pqV1ZicTZxRm1VUGhVZ1RUZElocnZudUFNYjFiTHB2a3Z4dklSWl91ZTRxRnJSTmptNHh3QjRhMmRaNEtfU29JT3hNWGo0czVNX1BXQVpfd1ozS053NmloQnI5bVF8UUFxQ2hnfF9tMW9TSFplZlRnVlhid2VyMmU0MlE',
  'type': 'bearer',
  'expiresIn': 1513082450099,
  'refreshToken': 'SUFEMDFQMDlQQVMwMHxBQURwYUlrX2ZiRnFGNzRRcHB6UzdQeUdIZVYxRVFicjZLM0otYV9zNHVpQlJjcE11Mko2d3djRnhFRUpvZFpWcUN6WU5nVEhXVHo4am54N01VVnFzNHZvZTQ0Q1M5VHdQVlFrTk5HSVFwbzBSd0p3S29HM0dOVUpZTnpJU3N2NW83VjhURjFCRmFGQ2lIajg5aDA3UVJmZ2M1YXF5VXZRd3FkQlhFWV9tcGdFbE1Ra0pqV1ZicTZxX19ROTZvS3JMY1locnZudUFNYjFiTHB2a3Z4dklSWl91ZTRxRnJSTmptNHh3QjRhMmRaNEtfU29JT3hNWGo0c19oX3JSNUtWYjg1UUg3ZEQzMU9LS1F8UUFxQ2hnfDlvRkdGLTZQV2toVDRLaExMUk4wMXc',
  'refreshTokenExpiresIn': 1513683650099,
  'scope': [
    'ReadMessages',
    'Faxes',
    'ReadPresence',
    'EditCallLog',
    'Meetings',
    'VoipCalling',
    'ReadClientInfo',
    'Glip',
    'Interoperability',
    'Contacts',
    'ReadAccounts',
    'EditExtensions',
    'RingOut',
    'SMS',
    'InternalMessages',
    'SubscriptionWebhook',
    'EditMessages',
    'EditPresence'
  ],
  'ownerId': '850957020',
  'endpointId': '0LjreNzeSxO9-yHFakmbhw'
}

describe('tokenStore', () => {
  test('MST Token', () => {
    const token = Token.create(tokenJson)
    const json = token.toJSON()
    expect(json).toEqual(tokenJson)
  })

  test('RC Token', async () => {
    expect.assertions(2)
    await tokenStore.clear()
    const rc = new RingCentral({
      tokenStore,
      server: secret.server,
      appKey: secret.appKey,
      appSecret: secret.appSecret
    })
    expect(rc.getToken()).rejects.toEqual(new Error('Token not exist.'))

    await rc.auth({
      username: secret.username,
      extension: secret.extension,
      password: secret.password
    })
    const rcToken = await rc.getToken()
    expect(rcToken.accessToken.length > 0).toBe(true)
  })
})
