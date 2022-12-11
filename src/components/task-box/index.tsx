import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/slices/projectsSlice';
import { TaskInterface } from '../../ts';

import { IconsEnum } from '../../helpers/themes';
import styles from './styles.module.scss';

interface ITaskBoxProps {
    index: number,
    task: TaskInterface,
    status: string
}

export const TaskBox = ({index, task, status}:ITaskBoxProps) => {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div 
                    className={styles.rootWrapper} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <div className={styles.deleteButtonWrapper}>
                        <span className={styles.deleteButton} onClick={() => dispatch(deleteTask({projectId, columnId: status, taskId: task.id}))} data-title='Delete task'><img src={IconsEnum.DELETE_ICON} alt='delete'/></span>
                    </div>
                    <div className={styles.taskHeader}>
                        <p>{task.title}</p>
                    </div>
                    <p>{task.description}</p>
                    <div className={styles.taskDate}>
                        <p>Created at: {`${task.createdAt[0]} ${task.createdAt[1]}`}</p>
                    </div>
                </div>
            )}
        </Draggable>
    )
}