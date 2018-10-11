import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import {Todo} from './todos.entity';
import { ITodo } from './interfaces/ITodo';
import { CreateTodosDTO } from './dto/createTodos.dto';
@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ){}

    public async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    public async findOne(options: object): Promise<Todo | null> {
        return await this.todoRepository.findOne(options);
    }

    public async findById(ID): Promise<Todo | null> {
        return await this.todoRepository.findOneOrFail(ID);
    }

    public async create(todo: CreateTodosDTO): Promise<Todo> {
        return await this.todoRepository.save(todo);
    }

    public async update(id: number, newValue: ITodo): Promise<Todo | null> {
        const todo = await this.todoRepository.findOneOrFail(id);
        if (!todo.id) {
            // tslint:disable-next-line:no-console
            console.error('user doesn\'t exist');
        }
        await this.todoRepository.update(id, newValue);
        return await this.todoRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.todoRepository.delete(id);
    }
}
