import Trip from "@base/modules/trips/infra/typeorm/entities/Trip";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("participants")
class Participant {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "text", nullable: true })
	name: string | null = null;

	@Column()
	email!: string;

	@Column()
	is_confirmed: boolean = false;

	@Column()
	is_owner: boolean = false;

	@ManyToOne(() => Trip, (trip) => trip.participants, { cascade: ["update"] })
	trip!: Trip;
}

export default Participant;
