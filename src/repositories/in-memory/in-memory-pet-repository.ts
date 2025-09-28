import {
  Pet,
  Prisma,
  Age,
  Size,
  EnergyLevel,
  Independence,
} from '@prisma/client'
import { PetsRepository } from '../pet-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = []

  async execute(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      details: data.details,
      city: data.city,
      age: data.age ?? null,
      energy_level: data.energy_level ?? null,
      size: data.size ?? null,
      independence: data.independence ?? null,
      created_at: new Date(),
      organization_id: data.organization_id,
    }

    this.pets.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    return this.pets.find((pet) => pet.id === id) || null
  }

  async findMany(query: {
    city: string
    age?: Age | null
    size?: Size | null
    energyLevel?: EnergyLevel | null
    independence?: Independence | null
  }): Promise<Pet[]> {
    return this.pets.filter((pet) => {
      if (pet.city.toLowerCase() !== query.city.toLowerCase()) {
        return false
      }

      if (query.age && pet.age !== query.age) {
        return false
      }

      if (query.size && pet.size !== query.size) {
        return false
      }

      if (query.energyLevel && pet.energy_level !== query.energyLevel) {
        return false
      }

      if (query.independence && pet.independence !== query.independence) {
        return false
      }

      return true
    })
  }
}
