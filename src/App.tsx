import { useState } from 'react';
import './App.css';
import { ToDoItem } from './ToDoItem/ToDoItem';
import { Form } from './Form/Form';

function App() {
    const [toDoList, setToDoList] = useState(['Добавьте задачу']);
    const deleteToDo = (index: number) => {
        setToDoList((toDos) => {
            const newToDos = toDos.slice();
            newToDos.splice(index, 1);
            return newToDos;
        });
    };
    return (
        <>
            <Form toDoList={toDoList} setToDoList={setToDoList} />
            <ul>
                {toDoList.map((toDoItem, index) => (
                    <ToDoItem
                        index={index}
                        toDoArrayItem={toDoItem}
                        deleteToDo={deleteToDo}
                        key={index}
                    />
                ))}
            </ul>
        </>
    );
}

export default App;
