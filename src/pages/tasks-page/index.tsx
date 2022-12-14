import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateTaskStatus, updateTasksOrder } from '../../redux/slices/projectsSlice';
import { showModal } from '../../redux/slices/modalSlice';
import { IoIosAddCircleOutline } from "react-icons/io";

import { stylesJoint } from '../../helpers/utils';

import { TasksColumn, Modal } from '../../components';
import { ErrorPage } from '../error-page';
import styles from './styles.module.scss';

export const TasksPage = () => {
    const { projectId } = useParams();

    const [project] = useSelector((state: RootState) => state.projects.projects.filter(item => item.id === projectId));
    const columns = project?.columns ?? [];
    const columnOrder = ['queue', 'development', 'done'];

    const dispatch = useDispatch();

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

    let content: JSX.Element = <React.Fragment/>;
    if(project) {
        content = (
                <section className={styles.rootWrapper}> 
                    <div className={styles.header}>
                        <div className={styles.projectTitleWrapper}>
                            <div className={project.status === 'progress' ? styles.projectStatus : stylesJoint(styles.projectStatus, styles.projectDone)}>
                                <p>{project.status === 'progress' ? 'In progress' : 'Done'}</p>
                            </div>
                            <p className={styles.projectTitle}>{project.title}</p>
                        </div>
                        <p onClick={() => dispatch(showModal({type: 'task', action: 'add'}))} className={styles.addTask}><IoIosAddCircleOutline style={{color: 'rgb(237, 171, 18)'}}/>Add new task</p>
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
                </section>
            )
    } else {
        content = <ErrorPage type='Project is not exist!'/>
    }

    return (
        <div style={{height: '100%'}}>
            {project?.status === 'done' ? <DoneModal/> : null}
            <Modal />
            {content}
        </div>
    )
}