// export interface IConfig {
//   PORT: string;
//   NODE_ENV: string;
//   MONGO_CONNECTION_STRING: string;
//   JWT_SECRET_KEY: string;
//   AUTH_MODE: boolean;
//   LOGGER_LEVEL: string;
// }

// export interface ITypeORMConfig {
//   POSTGRES_HOST: string | undefined;
//   POSTGRES_PORT: string | undefined;
//   POSTGRES_USER: string | undefined;
//   POSTGRES_PASSWORD: string | undefined;
//   POSTGRES_DB: string | undefined;
// }

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
