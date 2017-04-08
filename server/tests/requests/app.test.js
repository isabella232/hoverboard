/* global describe it expect beforeEach */

import request from 'supertest'

import schema from 'config/schema'
import config from 'config/environment'
import App from 'hoverBoard/app'
import Logger from 'hoverBoard/logger'

describe('App', () => {
  let server

  beforeEach(() => {
    const app = new App(config)
    server = app.relay.server
  })

  describe('Routes', () => {
    it('responds to /graphql', (done) => {
      const query = `
        query {
          viewer {
            id
            name
          }
        }
      `

      request(server)
        .get('/graphql')
        .query({ query: query })
        .end((err, res) => {
          expect(res.statusCode).toBe(200)
          expect(JSON.parse(res.text).data.viewer).toBe(null)
          done()
        })
    })

    it('responds to /login', (done) => {
      request(server)
        .get('/login')
        .end((err, res) => {
          expect(res.statusCode).toBe(302)
          done()
        })
    })
  })
})

