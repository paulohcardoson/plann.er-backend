import Trip from "./Trip";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("trips_activities")
class Activity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	title!: string;

	@Column()
	occurs_at!: Date;

	@ManyToOne(() => Trip, (trip) => trip.activities)
	trip!: Trip;
}

export default Activity;
