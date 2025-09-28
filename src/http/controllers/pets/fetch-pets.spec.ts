import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by city', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const organization = await prisma.organization.findFirstOrThrow()

    await prisma.pet.createMany({
      data: [
        {
          name: 'Rex',
          city: 'Sorocaba',
          details: 'Cachorro amigável e brincalhão',
          age: 'ADULTO',
          size: 'GRANDE',
          energy_level: 'ALTA',
          independence: 'ALTA',
          organization_id: organization.id,
        },
        {
          name: 'Bolt',
          city: 'Sorocaba',
          details: 'Cachorro pequeno',
          age: 'FILHOTE',
          size: 'PEQUENO',
          energy_level: 'BAIXA',
          independence: 'MEDIA',
          organization_id: organization.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'Sorocaba', size: 'PEQUENO' })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets[0]).toEqual(
      expect.objectContaining({
        name: 'Bolt',
        city: 'Sorocaba',
        size: 'PEQUENO',
      }),
    )
  })
})
