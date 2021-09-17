import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Steps } from './entities/steps.entity';
import { Todo } from './entities/todo.entity';
import { StepsRepository } from './steps.repository';
import { TodoStatus } from './todo.model';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
    @InjectRepository(Steps)
    private readonly stepsRepository: StepsRepository,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { title, description, steps } = createTodoDto;

    const stepsTodo = steps.map((step) =>
      this.stepsRepository.create({
        description: step.description,
        status: TodoStatus.OPEN,
      }),
    );

    await this.stepsRepository.save(stepsTodo);

    const todo = this.todoRepository.create({
      title,
      description,
      status: TodoStatus.OPEN,
      steps: stepsTodo,
      user,
    });
    await this.todoRepository.save(todo);

    return todo;
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async getTodoById(id: string): Promise<Todo> {
    const foundOne = await this.todoRepository.findOne(id);
    if (!foundOne) {
      throw new NotFoundException(`task with ${id} not found.`);
    }
    return foundOne;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { title, description, steps, status } = updateTodoDto;

    const updatedSteps = steps.map((step) =>
      this.stepsRepository.create({
        description: step.description,
        status: TodoStatus.IN_PROGRESS,
      }),
    );
    await this.stepsRepository.save(updatedSteps);

    const todo = await this.getTodoById(id);
    if (status) {
      todo.status = status;
    } else if (title) {
      todo.title = title;
    } else if (description) {
      todo.description = description;
    } else if (steps) {
      todo.steps = [...todo.steps, ...updatedSteps];
    }

    await this.todoRepository.save(todo);
    return todo;
  }

  async remove(id: string): Promise<void> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`cannot delet a non-existing task!`);
    }
  }
}
