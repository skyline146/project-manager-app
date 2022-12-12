import React, {useState} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTask, updateTaskStatus, updateTasksOrder } from '../../redux/slices/projectsSlice';
import { IoIosAddCircleOutline } from "react-icons/io";

import { TaskInterface } from '../../ts';
import { stylesJoint } from '../../helpers/utils';

import { TasksColumn, AddInfoModal } from '../../components';
import { ErrorPage } from '../error-page';
import styles from './styles.module.scss';

export const TasksPage = () => {
    const { projectId } = useParams();
    const [showModal, setShowModal] = useState<boolean>(false);

    const [project] = useSelector((state: RootState) => state.projects.projects.filter(item => item.id === projectId));
    const columns = project?.columns ?? [];
    const columnOrder = ['queue', 'development', 'done'];

    const dispatch = useDispatch();

    function addProjectTask (title: string, description: string) {
        const newTask: TaskInterface = {
            id: uuid(),
            title,
            description,
            createdAt: [...new Date().toLocaleString().split(', ')]
        }

        dispatch(addTask({projectId, task: newTask}));
    }

    const onDragEnd = (result: any) => {
        const { destination, draggableId, source } = result;

        const taskId: string = draggableId;
        const oldStatus: string = source.droppableId;
        const newStatus: string = destination.droppableId;
        const oldIndex: number = source.index;
        const newIndex: number = destination.index;

        if (!destination || (oldStatus === newStatus && oldIndex === newIndex)) {
            return;
        }


       if (oldStatus === newStatus) {
            dispatch(updateTasksOrder({projectId, taskId, columnId: oldStatus, oldIndex, newIndex}));
       } else {
            dispatch(updateTaskStatus({projectId, taskId, oldStatus, newStatus, oldIndex, newIndex}));
       }
        
    }

    const DoneModal = () => {
        return (
            <div>
                {/* some code in future */}
            </div>
        )
    }

    return (
        <div style={{height: '100%'}}>
            {project?.status === 'done' ? <DoneModal/> : null}
            {showModal ? <AddInfoModal type='task' closeModal={() => setShowModal(false)} addInfo={(title, descr) => addProjectTask(title, descr)}/> : null}
            {
                project ?
                <section className={styles.rootWrapper}> 
                    <div className={styles.header}>
                        <div className={styles.projectTitleWrapper}>
                            <div className={project.status === 'progress' ? styles.projectStatus : stylesJoint(styles.projectStatus, styles.projectDone)}>
                                <p>{project.status === 'progress' ? 'In progress' : 'Done'}</p>
                            </div>
                            <p className={styles.projectTitle}>{project.title}</p>
                        </div>
                        <p onClick={() => setShowModal(true)} className={styles.addTask}><IoIosAddCircleOutline/>Add new task</p>
                    </div>
                    <DragDropContext
                        onDragEnd={onDragEnd}>
                        <div className={styles.tasksColumnWrapper}>
                            {columnOrder.map(columnId => {
                                const column = columns[columnId];
                                const tasks = column.tasks;

                                return <TasksColumn key={column.id} type={column.id} tasks={tasks}/>;
                            })}
                        </div>
                    </DragDropContext>
                </section> :
                <ErrorPage type='Project is not exist!'/>
            }
        </div>
    )
}