import { ConnectionOptions } from 'typeorm';

export interface IUser {
  id?: string;
  name: string;
  login: string;
  password?: string;
}

export interface ITask {
  id?: string;
  order: number;
  title: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

export interface IColumn {
  id?: string;
  title: string;
  order: number;
}

export interface IBoard {
  id?: string;
  title: string;
  columns?: IColumn[];
}

export type ORMConnectionOptions = ConnectionOptions & {
  autoLoadEntities: boolean;
};
