import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register and authenticate an organization', async () => {
    await request(app.server).post('/organizations').send({
      name: 'ONG Amigo Pet',
      email: 'ong@example.com',
      password: 'password123',
      address: 'Rua Central, 123 - Sorocaba/SP',
      whatsapp: '5511999999999',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'ong@example.com',
      password: 'password123',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
