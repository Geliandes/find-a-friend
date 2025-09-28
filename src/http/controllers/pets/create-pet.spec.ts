import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Authenticate Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet when authenticated', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Ghost',
        city: 'Sorocaba',
        details: 'Pet sem ONG',
        age: 'ADULTO',
        size: 'GRANDE',
        energyLevel: 'ALTA',
        independence: 'ALTA',
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Ghost',
        city: 'Sorocaba',
        details: 'Pet sem ONG',
        age: 'ADULTO',
        size: 'GRANDE',
        energy_level: 'ALTA',
      }),
    )
  })
})
