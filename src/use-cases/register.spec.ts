import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { RegisterUseCase } from './register'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationsRepository)
  })

  it('should hash organization password upon registration', async () => {
    const request = {
      name: 'ONG Amigo Pet',
      email: 'ong@example.com',
      password: '123456',
      address: 'Rua Central, 123',
      whatsapp: '11999999999',
    }

    const { organization } = await sut.execute(request)

    const isPasswordCorrectlyHashed = await compare(
      request.password,
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with an existing email', async () => {
    const email = 'ong@example.com'

    await sut.execute({
      name: 'ONG Amigo Pet',
      email,
      password: '123456',
      address: 'Rua Central, 123',
      whatsapp: '11999999999',
    })

    await expect(
      sut.execute({
        name: 'ONG Amigo Pet',
        email,
        password: '123456',
        address: 'Rua Central, 123',
        whatsapp: '11999999999',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should be able to register an organization', async () => {
    const request = {
      name: 'ONG Amigo Pet',
      email: 'ong@example.com',
      password: '123456',
      address: 'Rua Central, 123',
      whatsapp: '11999999999',
    }

    const { organization } = await sut.execute(request)

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: request.name,
        email: request.email,
        address: request.address,
        whatsapp: request.whatsapp,
      }),
    )
    expect(organization.password_hash).toEqual(expect.any(String))
  })
})
