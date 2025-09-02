import type { ToDo } from './type';

export async function getToDos(): Promise<ToDo[]> {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        if (!response.ok) {
            throw Error('Ошибка на запросе');
        }
        const result: ToDo[] = await response.json();
        return result;
    } catch (e) {
        console.warn('Нет ответа с сервера: ', e);
        return [];
    }
}
