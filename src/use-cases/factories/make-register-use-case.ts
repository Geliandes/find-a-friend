import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organization-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const OrganizationsRepository = new PrismaOrganizationsRepository()
  const registerUseCase = new RegisterUseCase(OrganizationsRepository)

  return registerUseCase
}
