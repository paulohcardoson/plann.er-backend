import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Trip from "./Trip";

@Entity("trips_links")
class Link {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	title!: string;

	@Column()
	url!: string;

	@ManyToOne(() => Trip, (trip) => trip.links)
	trip!: Trip;
}

export default Link;
