const request = require('supertest')
const server = require('../api/server.js')
const db = require('../database/dbConfig.js')


// afterEach(async () => {
//   await server.close();
//   await db.disconnect();
// })

describe('API', () => {


  beforeEach(async () => {
    await db("users").truncate();
  })
  describe('Register User', () => {
    it('recieves 201 when user is registered', () => {
      return request(server)
      .post('/api/auth/register')
      .send({
        username:"test",
        password: "testpw"
      })
      .then(res => expect(res.status).toBe(201))
      

    },99999)
  })
  describe('Register User Failure', () => {
    it('should 500 if password is not submitted', () => {
      return request(server)
      .post('/api/auth/register')
      .send({
        username: "test"
      })
      .then(res => expect(res.status).toBe(500))
    }, 99999)
  })

  describe('Login', () => {
    it('should send 200 after successful login', () => {
      return request(server)
      .post('/api/auth/register')
      .send({username: "test", password: "testpw"})
      .then(res => {
        return request(server)
        .post('/api/auth/login')
        .send({username: "test", password: "testpw"})
        .then(res => expect(res.status).toBe(200))
      })
    }, 99999)
    
  })

  describe('Login', () => {
    it('should 401 if invalid password', () => {
      return request(server)
      .post('/api/auth/register')
      .send({
        username: 'test',
        password: 'testpw'
      })

      .then(response => {
      return request(server)
      .post('/api/auth/login')
      .send({
        username: 'test',
        password: 'jealousbf'
      })
      .then(response => expect(response.status).toBe(401))
    })
      
    }, 99999)

  })

  describe('Jokes', () => {
    it('should send 400 if not authorized', () => {
      return request(server)
      .get('/api/jokes')
      .then(response => {
        // console.log(response)
        expect(response.status).toBe(400)
      })
    }, 99999)

    
  })

  describe('Jokes', () => {
    it('should have JSON datatype', () => {
      return request(server)
      .get('/api/jokes')
      .then(response => {
        expect(response.headers['content-type']).toBe("application/json; charset=utf-8")
      })
    }, 99999)

    
  })

})