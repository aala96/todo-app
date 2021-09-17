/* eslint-disable prettier/prettier */
import { Todo } from 'src/todo/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;
  
  @OneToMany(type => Todo, todo => todo.user, {eager: true})
  todo : Todo[]
}
