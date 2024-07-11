import { FindManyOptions, FindOneOptions } from "typeorm";
import Link from "../infra/typeorm/entities/Link.js";
import ICreateLinkDTO from "../dtos/ICreateLinkDTO.js";

export type TFindManyOptions = Omit<FindManyOptions<Link>, "where">;
export type TFindOneOptions = Omit<FindOneOptions<Link>, "where">;

interface ILinksRepository {
	create(data: ICreateLinkDTO): Promise<Link>;
}

export default ILinksRepository;
