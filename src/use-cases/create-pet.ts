import { OrganizationsRepository } from '@/repositories/organization-repository'
import { PetsRepository } from '@/repositories/pet-repository'
import { Age, EnergyLevel, Independence, Pet, Size } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  details: string
  city: string
  age: Age | null
  energyLevel: EnergyLevel | null
  size: Size | null
  independence: Independence | null
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    details,
    city,
    age,
    energyLevel,
    size,
    independence,
    organizationId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.execute({
      name,
      details,
      city,
      age,
      energy_level: energyLevel,
      size,
      independence,
      organization_id: organizationId,
    })

    return { pet }
  }
}
