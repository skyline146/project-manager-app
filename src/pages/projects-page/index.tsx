import React, {useState} from 'react';
import { v4 as uuid } from 'uuid';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addProject } from '../../redux/slices/projectsSlice';

import { ProjectInterface } from '../../ts';
import { AllProjects, AddInfoModal } from '../../components';

import { IoIosAddCircleOutline } from "react-icons/io";
import styles from './styles.module.scss';
import './styles.module.scss';

export const ProjectsPage = () => {
    const projects = useSelector((state: RootState) => state.projects.projects);
    const [showModal, setShowModal] = useState<boolean>(false);

    const dispatch = useDispatch();

    const addNewProject = (projectTitle:string, projectDescr:string) => {
        const id = uuid();
        

        const newProject: ProjectInterface = {
            id,
            title: projectTitle,
            description: projectDescr,
            status: 'progress',
            createdAt: [...new Date().toLocaleString().split(', ')],
            columns: {
                queue: {
                  id: 'queue',
                  tasks: []
                },
                development: {
                    id: 'development',
                    tasks: []
                },
                done: {
                    id: 'done',
                    tasks: []
                },
            }
        }

        dispatch(addProject(newProject));
    }

    let content: JSX.Element = <React.Fragment/>;

    if(projects.length === 0) {
        content = (
            <div className={styles.placeholderWrapper} onClick={() => setShowModal(true)}>
                <p>You don't have projects :( </p>
                <p>Click to create now!</p>
            </div>
        )
        
    } else {
        content = <AllProjects/>
    }

    return (
        <div style={{height: '100%'}}>
            <AddInfoModal type='project' isShow={showModal} closeModal={() => setShowModal(false)} addInfo={(title:string, descr:string) => addNewProject(title, descr)}/>
            <section className={styles.rootWrapper}>
                <div className={styles.header}>
                    <p className={styles.projectsCount}>You have <span>{`${projects.length}`}</span> active {projects.length === 1 ? 'project' : 'projects'}.</p>
                    <p onClick={() => setShowModal(true)} className={styles.projectsCount}><IoIosAddCircleOutline style={{color: 'rgb(237, 171, 18)'}}/>Add new project</p>
                </div>
                {content}
            </section>
        </div>
    )
}

