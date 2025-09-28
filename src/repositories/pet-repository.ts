import {
  Prisma,
  Pet,
  Age,
  Size,
  EnergyLevel,
  Independence,
} from '@prisma/client'

export interface PetsRepository {
  execute: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>
  findById: (id: string) => Promise<Pet | null>
  findMany: (query: {
    city: string
    age?: Age | null
    size?: Size | null
    energyLevel?: EnergyLevel | null
    independence?: Independence | null
  }) => Promise<Pet[]>
}
