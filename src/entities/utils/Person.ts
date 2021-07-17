import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity('person')
export class Person extends BaseEntity {
    @PrimaryColumn({
        type: "uuid"
    })
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: true,
        length: 10
    })
    card_number: string;
}