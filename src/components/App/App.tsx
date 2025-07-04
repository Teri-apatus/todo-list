import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { ToDoItem, type ToDoTask } from '../ToDoItem/ToDoItem';
import { Form } from '../Form/Form';
import { localStorageService } from '../../utils/localStorage';
import { DEFAULT_TASK_LIST } from '../../constants';

const getDataFromLS = (): ToDoTask[] => {
    const dataFromLS = localStorageService.get();
    if (dataFromLS && dataFromLS !== '[]') {
        try {
            return JSON.parse(dataFromLS);
        } catch (e) {
            console.log('error', e);
        }
    }
    return DEFAULT_TASK_LIST;
};

function App() {
    const [toDoList, setToDoList] =
        useState<ToDoTask[]>(getDataFromLS);
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
