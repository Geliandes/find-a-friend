import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsUseCase } from './fetch-pets'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository)

    await organizationsRepository.create({
      id: 'ong-01',
      name: 'ONG Amigo Pet',
      email: 'ong@example.com',
      password_hash: '123456',
      address: 'Rua Central, 123',
      whatsapp: '11999999999',
    })

    await petsRepository.execute({
      id: 'pet-01',
      name: 'Rex',
      city: 'Sorocaba',
      details: 'Cachorro amigável e brincalhão',
      age: 'ADULTO',
      size: 'GRANDE',
      energy_level: 'ALTA',
      independence: 'ALTA',
      organization_id: 'ong-01',
    })

    await petsRepository.execute({
      id: 'pet-02',
      name: 'Bolt',
      city: 'Sorocaba',
      details: 'Cachorro pequeno',
      age: 'FILHOTE',
      size: 'PEQUENO',
      energy_level: 'BAIXA',
      independence: 'MEDIA',
      organization_id: 'ong-01',
    })

    await petsRepository.execute({
      id: 'pet-03',
      name: 'Mia',
      city: 'Campinas',
      details: 'Gato dócil',
      age: 'ADULTO',
      size: 'MEDIO',
      energy_level: 'MEDIA',
      independence: 'ALTA',
      organization_id: 'ong-01',
    })
  })

  it('should be able to filter pets by size', async () => {
    const { pets } = await sut.execute({
      city: 'Sorocaba',
      size: 'GRANDE',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].id).toBe('pet-01')
  })

  it('should be able to filter pets by energy level', async () => {
    const { pets } = await sut.execute({
      city: 'Sorocaba',
      energyLevel: 'BAIXA',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].id).toBe('pet-02')
  })

  it('should be able to filter pets by independence level', async () => {
    const { pets } = await sut.execute({
      city: 'Sorocaba',
      independence: 'ALTA',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].id).toBe('pet-01')
  })

  it('should be able to combine multiple filters', async () => {
    const { pets } = await sut.execute({
      city: 'Sorocaba',
      age: 'FILHOTE',
      size: 'PEQUENO',
      energyLevel: 'BAIXA',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].id).toBe('pet-02')
  })
})
