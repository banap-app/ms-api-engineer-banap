import { CREA } from '../../domain/crea-vo';
import { Engineer } from '../../domain/engineer';

export type EngineerOutput = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  crea: CREA;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class EngineerOutputMapper {
  static toOutput(entity: Engineer) {
    const { engineerId, ...other } = entity.toJSON();
    return {
      id: engineerId,
      ...other,
    };
  }
}
