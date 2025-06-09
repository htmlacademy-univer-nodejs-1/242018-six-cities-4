import { types } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import { DocumentExists } from '../../../rest/libs/types/document-exists.interface.js';

export interface UserService extends DocumentExists {
  create(dto: CreateUserDto, salt: string): Promise<types.DocumentType<UserEntity>>;

  findByEmail(email: string): Promise<types.DocumentType<UserEntity> | null>;

  findOrCreate(
    dto: CreateUserDto,
    salt: string
  ): Promise<types.DocumentType<UserEntity>>;

  findById(userId: string): Promise<types.DocumentType<UserEntity> | null>;

  exists(documentId: string): Promise<boolean>;
}
