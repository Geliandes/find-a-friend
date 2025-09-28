import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('GetPetDetailsUseCase', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)

    await organizationsRepository.create({
      id: 'ong-01',
      name: 'ONG Amigo Pet',
      email: 'ong@example.com',
      password_hash: '123456',
      address: 'Rua Central, 123',
      whatsapp: '11999999999',
    })

    for (let i = 1; i <= 3; i++) {
      await petsRepository.execute({
        id: `pet-0${i}`,
        name: 'Rex',
        city: 'Sorocaba',
        details: 'Cachorro amigável e brincalhão',
        age: 'ADULTO',
        size: 'GRANDE',
        energy_level: 'ALTA',
        independence: 'ALTA',
        organization_id: 'ong-01',
      })
    }
  })

  it('should be able to get pet details', async () => {
    const { pet } = await sut.execute({
      petId: 'pet-01',
    })

    expect(pet).toBeTruthy()
    expect(pet.id).toEqual('pet-01')
  })

  it('should not be able to get pet details with invalid id', async () => {
    await expect(
      sut.execute({
        petId: 'id-99',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
