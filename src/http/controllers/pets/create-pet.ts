import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { Age, EnergyLevel, Independence, Size } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    details: z.string(),
    city: z.string(),
    age: z.enum(Age).nullable(),
    energyLevel: z.enum(EnergyLevel).nullable(),
    size: z.enum(Size).nullable(),
    independence: z.enum(Independence).nullable(),
  })

  const { name, details, city, age, energyLevel, size, independence } =
    createPetBodySchema.parse(request.body)

  const organizationId = request.user.sub

  console.log(organizationId)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const { pet } = await createPetUseCase.execute({
      name,
      details,
      city,
      age,
      energyLevel,
      size,
      independence,
      organizationId,
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    throw err
  }
}
