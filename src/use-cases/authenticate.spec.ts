import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      name: 'ONG Amigo Pet',
      email: 'ong@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua Central, 123',
      whatsapp: '11999999999',
    })

    const { organization } = await sut.execute({
      email: 'ong@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(async () => {
      await sut.execute({
        email: 'ong2@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      name: 'ONG Amigo Pet',
      email: 'ong@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua Central, 123',
      whatsapp: '11999999999',
    })

    await expect(async () => {
      await sut.execute({
        email: 'ong@example.com',
        password: '1234568',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
