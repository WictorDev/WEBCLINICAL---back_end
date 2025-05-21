import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
} 