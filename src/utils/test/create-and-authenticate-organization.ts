import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: 'ONG Amigo Pet',
      email: 'ong@example.com',
      password_hash: await hash('password123', 6),
      address: 'Rua Central, 123',
      whatsapp: '11999999999',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'ong@example.com',
    password: 'password123',
  })

  const { token } = authResponse.body

  return { token }
}
