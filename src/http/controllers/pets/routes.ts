import { FastifyInstance } from 'fastify'
import { getPetDetails } from './get-pet-details'
import { createPet } from './create-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { fetchPets } from './fetch-pets'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', getPetDetails)
  app.get('/pets', fetchPets)

  app.post('/pets', { onRequest: [verifyJWT] }, createPet)
}
