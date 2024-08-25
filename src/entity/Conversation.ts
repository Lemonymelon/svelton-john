import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.conversations)
    user!: User;

    @Column()
    prompt!: string;

    @Column({ type: 'json' })
    good_responses!: object;

    @Column({ type: 'json' })
    bad_responses!: object;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
