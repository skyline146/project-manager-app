import React, {useState, useEffect} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTask, updateTaskStatus } from '../../redux/slices/projectsSlice';
import { loadColumnData, updateColumnOrder } from '../../redux/slices/columnsSlice';

import { TaskInterface } from '../../ts';
import { stylesJoint } from '../../helpers/utils';

import { TasksColumn, AddInfoModal } from '../../components';
import { ErrorPage } from '../error-page';
import { IconsEnum } from '../../helpers/themes';
import styles from './styles.module.scss';

export const TasksPage = () => {
    const { projectId } = useParams();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [project] = useSelector((state: RootState) => state.projects.projects.filter(item => item.id === projectId));
    const tasks = project?.tasks ?? [];
    const columns = useSelector((state: RootState) => state.columns.columns);

    const dispatch = useDispatch();

    // dispatch(loadColumnData(tasks));

    useEffect(() => {
        if (!project) {
            return;
        }
        dispatch(loadColumnData(tasks));
        //eslint-disable-next-line
    }, [tasks]);

    function addProjectTask (title: string, description: string) {
        const newTask: TaskInterface = {
            id: uuid(),
            title,
            description,
            status: 'queue',
            createdAt: [...new Date().toLocaleString().split(', ')]
        }

        dispatch(addTask({projectId, task: newTask}));
    }

    const onDragEnd = (result: any) => {
        const { destination, draggableId, source } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const taskId: string = draggableId;
        const newStatus: string = destination.droppableId;
        const oldIndex: number = source.index;
        const newIndex: number = destination.index;

        if (source.droppableId !== newStatus) {
            dispatch(updateTaskStatus({projectId, taskId, newStatus, newIndex}));
        } else {
            dispatch(updateColumnOrder({columnId: source.droppableId, taskId, oldIndex, newIndex}));
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
                        <p onClick={() => setShowModal(true)} className={styles.addTask}><img src={IconsEnum.ADD_ICON} alt='add'/>Add new task</p>
                    </div>
                    <DragDropContext
                        onDragEnd={onDragEnd}>
                        <div className={styles.tasksColumnWrapper}>
                            {columns.map(column => {
                                return <TasksColumn key={column.id} type={column.id} tasks={column.tasks}/>
                            })}
                        </div>
                    </DragDropContext>
                </section> :
                <ErrorPage type='Project is not exist!'/>
            }
        </div>
    )
}