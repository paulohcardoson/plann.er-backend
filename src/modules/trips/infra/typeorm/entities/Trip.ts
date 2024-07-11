import Participant from "@base/modules/trips/infra/typeorm/entities/Participant";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	RelationOptions,
	UpdateDateColumn,
} from "typeorm";
import Link from "./Link";
import Activity from "./Activity";

const cascade: RelationOptions["cascade"] = ["remove", "update"];

@Entity("trips")
class Trip {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	destination!: string;

	@Column()
	starts_at!: Date;

	@Column()
	ends_at!: Date;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@Column()
	is_confirmed: boolean = false;

	@OneToMany(() => Participant, (participant) => participant.trip, { cascade })
	participants!: Participant[];

	@OneToMany(() => Activity, (activity) => activity.trip, { cascade })
	activities!: Activity[];

	@OneToMany(() => Link, (link) => link.trip, { cascade })
	links!: Link[];
}

export default Trip;
