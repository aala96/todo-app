/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from '../todo.model';
import { Todo } from './todo.entity';

@Entity()
export class Steps {
  @PrimaryGeneratedColumn('uuid')  
  id: string;
  
  @Column()
  description_annother_test: string;

  @Column()
  status: TodoStatus;

  @ManyToOne((type) => Todo, task => task.steps, { eager: false })
  todo : Todo;
}
