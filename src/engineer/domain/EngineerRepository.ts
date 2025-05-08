import { IRepository } from "src/shared/domain/repository/IRepository";
import { Engineer, EngineerId } from "./Engineer";

export interface IEngineerRepository extends IRepository<Engineer, EngineerId> {}