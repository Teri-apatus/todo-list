import type { ToDoTask } from './entity/toDo';

export const DEFAULT_TASK_LIST: ToDoTask[] = [
    { id: 1, header: 'Добавить задачу', text: '', isDone: false },
];

export const DARK_THEME_CLASS = 'dark-theme';
