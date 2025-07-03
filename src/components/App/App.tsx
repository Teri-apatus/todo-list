import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { ToDoItem, type ToDoTask } from '../ToDoItem/ToDoItem';
import { Form } from '../Form/Form';
import { localStorageService } from '../../utils/localStorage';
import { setInitialState } from '../../utils/setInitialState';

function App() {
    const [toDoList, setToDoList] =
        useState<ToDoTask[]>(setInitialState);
    const [inputValue, setInputValue] = useState('');
    const [isNeedFilter, setIsNeedFilter] = useState(false);

    useEffect(() => {
        localStorageService.set(JSON.stringify(toDoList));
    }, [toDoList]);

    const editToDo = (id: number, text: string) => {
        setToDoList((tasks) => {
            const editedTasks: ToDoTask[] = tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, text };
                }
                return task;
            });
            return editedTasks;
        });
    };

    const deleteToDo = (id: number) => {
        setToDoList((tasks) => {
            return tasks.filter((task) => task.id !== id);
        });
    };

    // редактировать надо по аналогии с удалением
    // key менять не нужно

    const renderingToDoList = useMemo(() => {
        return toDoList.filter((_, i) => {
            if (isNeedFilter) {
                return i % 2 === 0;
            }

            return true;
        });
    }, [toDoList, isNeedFilter]);

    return (
        <>
            <Form setToDoList={setToDoList} />
            <input
                type="checkbox"
                checked={isNeedFilter}
                onChange={() =>
                    setIsNeedFilter((isNeedFilter) => !isNeedFilter)
                }
            ></input>
            <input
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            ></input>
            <ul>
                {renderingToDoList.map((task) => (
                    <ToDoItem
                        key={task.id}
                        task={task}
                        editToDo={editToDo}
                        deleteToDo={deleteToDo}
                    />
                ))}
            </ul>
        </>
    );
}

export default App;
