import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { ToDoItem, type ToDoTask } from './ToDoItem/ToDoItem';
import { Form } from './Form/Form';
import { localStorageService } from './storage/localStorage';
import { DEFAULT_TASK_LIST } from './constants';

let prevSomeObj: object;
let counter = 0;

function App() {
    const setInitialState = () => {
        const dataFromLS = localStorageService.get();
        if (dataFromLS) {
            const toDoListFromLS: ToDoTask[] = JSON.parse(dataFromLS);
            return toDoListFromLS;
        }
        return DEFAULT_TASK_LIST;
    };

    const [toDoList, setToDoList] =
        useState<ToDoTask[]>(setInitialState);

    const [inputValue, setInputValue] = useState('');
    const [isNeedFilter, setIsNeedFilter] = useState(false);

    useEffect(() => {
        if (toDoList !== DEFAULT_TASK_LIST) {
            localStorageService.set(JSON.stringify(toDoList));
        }
    }, [toDoList]);

    const deleteToDo = (id: number) => {
        setToDoList((toDos) => {
            return toDos.filter((item) => item.id !== id);
        });
    };

    // редактировать надо по аналогии с удалением
    // key менять не нужно

    console.log(
        prevSomeObj === deleteToDo,
        { prevSomeObj, deleteToDo },
        counter++
    );
    prevSomeObj = deleteToDo;

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
                onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <ul>
                {renderingToDoList.map((task) => (
                    <ToDoItem
                        key={task.id}
                        task={task}
                        deleteToDo={deleteToDo}
                    />
                ))}
            </ul>
        </>
    );
}

export default App;
