import { PetsRepository } from '@/repositories/pet-repository'
import { Age, EnergyLevel, Independence, Pet, Size } from '@prisma/client'

interface FetchPetsUseCaseRequest {
  city: string
  age?: Age | null
  size?: Size | null
  energyLevel?: EnergyLevel | null
  independence?: Independence | null
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    independence,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    if (!city) {
      throw new Error('City is required')
    }

    const pets = await this.petsRepository.findMany({
      city,
      age,
      size,
      energyLevel,
      independence,
    })

    return { pets }
  }
}
