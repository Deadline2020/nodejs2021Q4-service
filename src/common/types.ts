export interface User {
  id?: string;
  name: string;
  login: string;
  password?: string;
}

export interface Task {
  id?: string;
  order: string;
  title: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

export interface Column {
  id?: string;
  title: string;
  order: number;
}

export interface Board {
  id?: string;
  title: string;
  order: string;
  columns?: Column[];
}
