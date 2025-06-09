import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/hash.js';
import { DEFAULT_AVATAR_FILE_NAME } from './user.constant.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    type: String,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
    unique: true,
  })
  public mail: string;

  @prop({ required: false, default: DEFAULT_AVATAR_FILE_NAME, type: String, nullable: true })
  public avatar: string | null;

  @prop({ required: true, default: '', type: String })
  public name: string;

  @prop({ required: true, default: '', type: String })
  private password?: string;

  @prop({ required: true, type: String, default: UserType.Base })
  public type: UserType;

  constructor(userData: User) {
    super();

    this.mail = userData.mail;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
