import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoStatus } from '../todo.model';
import { Steps } from './steps.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TodoStatus;

  @OneToMany((type) => Steps, (sub) => sub.todo, {
    eager: true,
  })
  steps: Steps[];

  @ManyToOne((type) => User, (user) => user.todo, { eager: false })
  user: User;
}
