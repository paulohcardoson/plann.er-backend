import PostgreSQLDataSource from "@base/shared/infra/typeorm/databases/postgresql";
import ILinksRepository from "@base/modules/trips/repositories/ILinksRepository";
import ICreateLinkDTO from "@base/modules/trips/dtos/ICreateLinkDTO";
import Link from "../entities/Link";

class LinksRepository implements ILinksRepository {
	constructor(private repository = PostgreSQLDataSource.getRepository(Link)) {}

	async create(data: ICreateLinkDTO): Promise<Link> {
		const link = this.repository.create(data);

		await this.repository.save(link);

		return link;
	}
}

export default LinksRepository;
