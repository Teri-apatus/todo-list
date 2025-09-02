export interface ToDo {
    id: number;
    header: string;
    text: string;
    isDone: boolean;
}

export type EditingTodo = Pick<ToDo, 'id'> &
    Partial<Omit<ToDo, 'id'>>;
