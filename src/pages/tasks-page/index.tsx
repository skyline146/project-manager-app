import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { updateTaskStatus, updateTasksOrder } from '../../redux/slices/projectsSlice';
import { showModal } from '../../redux/slices/modalSlice';
import { IoIosAddCircleOutline } from "react-icons/io";

import { ColumnsInterface } from '../../ts';
import { stylesJoint } from '../../helpers/utils';

import { TasksColumn } from '../../components';
import { ErrorPage } from '../error-page';
import styles from './styles.module.scss';

export const TasksPage = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    // const selectProjects = (state: RootState) => state.projects.projects;

    // const project = createSelector(selectProjects, projects => projects.filter(project => project.id === projectId));

    // console.log(project);
    

    const [project] = useSelector((state: RootState) => state.projects.projects.filter(item => item.id === projectId));

    if(!project) {
        return <ErrorPage type='Project is not exist!'/>;
    }

    const columns: ColumnsInterface = project.columns;
    const columnsOrder = ['queue', 'development', 'done'];

    const onDragEnd = (result: any) => {
        const { destination, draggableId, source } = result;

        if(!destination) {
            return;
        }

        const taskId: string = draggableId,
              oldStatus: string = source.droppableId,
              newStatus: string = destination.droppableId,
              oldIndex: number = source.index,
              newIndex: number = destination.index;

        if (oldStatus === newStatus && oldIndex === newIndex) {
            return;
        }


       if (oldStatus === newStatus) {
            dispatch(updateTasksOrder({projectId, taskId, columnId: oldStatus, oldIndex, newIndex}));
       } else {
            dispatch(updateTaskStatus({projectId, taskId, oldStatus, newStatus, oldIndex, newIndex}));
       }
        
    }

    return (
        <div style={{height: '100%'}}>
            <section className={styles.rootWrapper}> 
                <div className={styles.header}>
                    <div className={styles.projectTitleWrapper}>
                        <div className={project.status === 'progress' ? styles.projectStatus : stylesJoint(styles.projectStatus, styles.projectDone)}>
                            <p>{project.status === 'progress' ? 'In progress' : 'Done'}</p>
                        </div>
                        <p className={styles.projectTitle}>{project.title}</p>
                    </div>
                    <p onClick={() => dispatch(showModal({type: 'task', action: 'add', id: projectId}))} className={styles.addTask}><IoIosAddCircleOutline style={{color: 'rgb(237, 171, 18)'}}/>Add new task</p>
                </div>
                <DragDropContext
                    onDragEnd={onDragEnd}>
                    <div className={styles.tasksColumnWrapper}>
                        {columnsOrder.map(columnId => {
                            const column = columns[columnId];
                            const tasks = column.tasks;

                            return <TasksColumn key={column.id} type={column.id} tasks={tasks}/>;
                        })}
                    </div>
                </DragDropContext>
            </section>
        </div>
    )
}