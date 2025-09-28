import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { CreatePetUseCase } from '@/use-cases/create-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository, organizationsRepository)

    await organizationsRepository.create({
      id: 'ong-01',
      name: 'ONG Amigo Pet',
      email: 'ong@example.com',
      password_hash: '123456',
      address: 'Rua Central, 123',
      whatsapp: '11999999999',
    })
  })

  it('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Rex',
      city: 'Sorocaba',
      details: 'Cachorro amigável e brincalhão',
      age: 'ADULTO',
      size: 'GRANDE',
      energyLevel: 'ALTA',
      independence: 'ALTA',
      organizationId: 'ong-01',
    })

    expect(pet).toBeTruthy()
    expect(pet.organization_id).toEqual('ong-01')
    expect(pet.name).toEqual('Rex')
  })

  it('should not persist pet if organization does not exist', async () => {
    await expect(
      sut.execute({
        name: 'Ghost',
        city: 'Sorocaba',
        details: 'Pet sem ONG',
        age: 'ADULTO',
        size: 'GRANDE',
        energyLevel: 'ALTA',
        independence: 'ALTA',
        organizationId: 'ong-99',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should allow registering a pet without optional fields', async () => {
    const { pet } = await sut.execute({
      name: 'Luna',
      city: 'Campinas',
      details: 'Gatinha dócil',
      age: null,
      size: null,
      energyLevel: null,
      independence: null,
      organizationId: 'ong-01',
    })

    expect(pet).toBeTruthy()
    expect(pet.age).toBeNull()
    expect(pet.size).toBeNull()
    expect(pet.energy_level).toBeNull()
  })
})
