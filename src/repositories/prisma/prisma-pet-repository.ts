import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pet-repository'

export class PrismaPetsRepository implements PetsRepository {
  async execute(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findMany(query: {
    city: string
    age?: Prisma.PetWhereInput['age'] | null
    size?: Prisma.PetWhereInput['size'] | null
    energyLevel?: Prisma.PetWhereInput['energy_level'] | null
    independence?: Prisma.PetWhereInput['independence'] | null
  }) {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          equals: query.city,
          mode: 'insensitive',
        },
        age: query.age,
        size: query.size,
        energy_level: query.energyLevel,
        independence: query.independence,
      },
    })

    return pets
  }
}
