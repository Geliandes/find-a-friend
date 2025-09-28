import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    organizationsRepository,
  )

  return createPetUseCase
}
