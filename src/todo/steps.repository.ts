/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Steps } from './entities/steps.entity';

@EntityRepository(Steps)
export class StepsRepository extends Repository<Steps> {}