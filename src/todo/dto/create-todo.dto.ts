import { IsNotEmpty, IsOptional } from 'class-validator';
import { Steps } from '../entities/steps.entity';
import { TodoStatus } from '../todo.model';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  steps: Steps[];

  @IsNotEmpty()
  status: TodoStatus.OPEN;
}
