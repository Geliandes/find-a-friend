import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { Age, Size, EnergyLevel, Independence } from '@prisma/client'
import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.enum(Age).optional(),
    size: z.enum(Size).optional(),
    energyLevel: z.enum(EnergyLevel).optional(),
    independence: z.enum(Independence).optional(),
  })

  const { city, age, size, energyLevel, independence } =
    fetchPetsQuerySchema.parse(request.query)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute({
    city,
    age,
    size,
    energyLevel,
    independence,
  })

  return reply.status(200).send({
    pets,
  })
}
