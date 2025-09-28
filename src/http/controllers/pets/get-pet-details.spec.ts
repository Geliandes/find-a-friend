import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'

describe('Get Pet By Id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find a pet by id', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const organization = await prisma.organization.findFirstOrThrow()

    const pet = await prisma.pet.create({
      data: {
        name: 'Cachorro',
        city: 'Sorocaba',
        details: 'Pet sem ONG',
        age: 'ADULTO',
        organization_id: organization.id,
      },
    })

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: pet.id,
        name: 'Cachorro',
        city: 'Sorocaba',
        details: 'Pet sem ONG',
        age: 'ADULTO',
        organization_id: organization.id,
      }),
    )
  })
})
