import { Engineer } from '../../domain/engineer';

export type EngineerOutput = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  crea: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class EngineerOutputMapper {
  static toOutput(entity: Engineer) {
    const { engineerId, profilePicture, ...other } = entity.toJSON();
    return {
      id: engineerId,
      profilePicture: entity.profilePicture ? entity.profilePicture.url : null,
      ...other,
    };
  }
}
