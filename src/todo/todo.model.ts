/* eslint-disable prettier/prettier */
export class Step {
  id: string;
  description?: string;
  status: TodoStatus.OPEN;
}

export enum TodoStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
  }