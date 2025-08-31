import { useContext, useState } from 'react';
import './ToDoItem.scss';
import type { ToDoTask } from '../../entity/toDo';
import { ToDoContext } from '../../entity/toDo/toDoContext';
import { Checkbox, IconButton } from '@mui/material';
import {
    Cancel,
    CheckCircle,
    CircleOutlined,
    DeleteForever,
    Edit,
    TaskAltOutlined,
} from '@mui/icons-material';
import styled from '@emotion/styled';

const TaskCheckbox = styled(Checkbox)({
    '& .MuiSvgIcon-root': {
        width: '1rem',
        color: '#fc3241',
    },
    '&.Mui-checked .MuiSvgIcon-root': {
        color: '#00b091',
    },
});

const EditButton = styled(IconButton)({
    '&:hover .MuiSvgIcon-root': { color: '#646cff' },
    '&[disabled]': {
        color: '#757575',
    },
});

const UpdateButton = styled(IconButton)({
    '&:hover .MuiSvgIcon-root': {
        color: '#00b091',
    },
});

const CancelButton = styled(IconButton)({
    '&:hover .MuiSvgIcon-root': { color: '#fc3241' },
});

const DeleteButton = styled(IconButton)({
    '&:hover .MuiSvgIcon-root': { color: '#fc3241' },
});

type ToDoItemProps = {
    task: ToDoTask;
};

export function ToDoItem({ task }: ToDoItemProps) {
    const { editToDo, deleteToDo } = useContext(ToDoContext);

    const [isEditMode, setIsEditMode] = useState(false);
    const [headerValue, setHeaderValue] = useState(task.header);
    const [textValue, setTextValue] = useState(task.text);

    return (
        <li
            className={`todo-item${
                task.isDone ? ' todo-item--completed' : ''
            }`}
        >
            <TaskCheckbox
                checked={task.isDone}
                onChange={() => {
                    editToDo({
                        header: task.header,
                        id: task.id,
                        isDone: !task.isDone,
                    });
                }}
                icon={<CircleOutlined />}
                checkedIcon={<TaskAltOutlined />}
            />
            <div className="todo-item__content">
                {isEditMode ? (
                    <>
                        <textarea
                            className="todo-item__input todo-item__input-header"
                            value={headerValue}
                            onChange={(e) => {
                                setHeaderValue(e.target.value);
                            }}
                            rows={1}
                        />
                        <textarea
                            className="todo-item__input todo-item__input-text"
                            value={textValue}
                            onChange={(e) => {
                                setTextValue(e.target.value);
                            }}
                            rows={4}
                        />
                    </>
                ) : (
                    <>
                        <h2 className="todo-item__header">
                            {headerValue}
                        </h2>
                        <pre className="todo-item__text">
                            {textValue}
                        </pre>
                    </>
                )}
            </div>

            <div className="todo-item__button-container">
                {isEditMode ? (
                    <>
                        <UpdateButton
                            onClick={() => {
                                editToDo({
                                    header: headerValue,
                                    id: task.id,
                                    text: textValue,
                                });
                                setIsEditMode(
                                    (isEditMode) => !isEditMode
                                );
                            }}
                        >
                            <CheckCircle />
                        </UpdateButton>{' '}
                        <CancelButton
                            onClick={() => {
                                setIsEditMode(
                                    (isEditMode) => !isEditMode
                                );
                                setHeaderValue(task.header);
                                setTextValue(task.text);
                            }}
                        >
                            <Cancel />
                        </CancelButton>
                    </>
                ) : (
                    <EditButton
                        disabled={task.isDone}
                        disableRipple
                        onClick={() => {
                            setIsEditMode(
                                (isEditMode) => !isEditMode
                            );
                        }}
                    >
                        <Edit />
                    </EditButton>
                )}
                <DeleteButton
                    onClick={() => {
                        deleteToDo(task.id);
                    }}
                >
                    <DeleteForever />
                </DeleteButton>
            </div>
        </li>
    );
}
