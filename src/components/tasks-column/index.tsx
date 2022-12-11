import { Droppable } from 'react-beautiful-dnd';
import { TaskInterface } from '../../ts';
import { TaskBox } from '../task-box';

import { stylesJoint } from '../../helpers/utils';
import styles from './styles.module.scss';

interface ITasksColumnProps {
    type: string,
    tasks: TaskInterface [],
}

export const TasksColumn = ({type, tasks}:ITasksColumnProps) => {
    let textColor = '';

    switch(type) {
        case 'development': {
            textColor = 'rgb(237, 171, 18)';
            break;
        }

        case 'done': {
            textColor = 'rgb(23, 163, 10)';
            break;
        }

        default: {
            textColor = '#adadad';
            break;
        }
    }

    return (
        <Droppable droppableId={type}>
            {(provided, snapshot) => (
                <div className={styles.rootWrapper}>
                    <div className={styles.tableHeader}>
                        <div>
                            <p style={{color: textColor}}>{type}</p>
                        </div>
                    </div>
                    <div 
                        className={snapshot.isDraggingOver ? stylesJoint(styles.tasksTable, styles.tasksTableDrag) : styles.tasksTable}
                        ref={provided.innerRef} 
                        {...provided.droppableProps}>
                        {tasks?.map((task, index) => {
                            return (
                                    <TaskBox
                                        key={task.id}
                                        index={index} 
                                        task={task}/>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    )
}