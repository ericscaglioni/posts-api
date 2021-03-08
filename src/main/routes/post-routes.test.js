const request = require('supertest')
const app = require('../config/app')

describe('Posts Routes suite tests', () => {
  describe('POST /posts', () => {
      it('Should return 400 if title is not provided', async () => {
        await request(app)
            .post('/api/posts')
            .send({
                text: 'any_text'
            })
            .expect(400)
      })

      it('Should return 201 on success', async () => {
        const httpResponse = await request(app)
          .post('/api/posts')
          .send({
            title: 'any_title',
            text: 'any_text'
          })
          .expect(201)
      })
  });
})
