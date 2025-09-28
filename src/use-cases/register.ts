import { hash } from 'bcryptjs'
import { OrganizationsRepository } from '@/repositories/organization-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists'
import { Organization } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  whatsapp: string
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    whatsapp,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      address,
      whatsapp,
    })

    return { organization }
  }
}
