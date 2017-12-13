# quick-glip

A quick Glip implementation with React and mobx-state-tree.


## Setup

```
yarn install
```

Create `secret.json` in root folder with the following content:

```json
{
    "server": "https://platform.ringcentral.com",
    "appKey": "appKey",
    "appSecret": "appSecret",
    "username": "username",
    "extension": "extension",
    "password": "password"
}
```


## Development

```
yarn build:watch
yarn start
```


## Pack

```
yarn dist:dev
```


## Distribution

```
GH_TOKEN=<github-token> yarn dist
```


## Todo

- Live data to test every MST model
- Clear all stores on logout
