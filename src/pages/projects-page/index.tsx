import React, {useState} from 'react';
import { v4 as uuid } from 'uuid';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addProject } from '../../redux/slices/projectsSlice';

import { ProjectInterface } from '../../ts';
import { AllProjects, AddInfoModal } from '../../components';

import { IconsEnum } from '../../helpers/themes';
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
            tasks: [],
        }

        dispatch(addProject(newProject));
    }

    if(showModal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    return (
        <div style={{height: '100%'}}>
            {showModal ? <AddInfoModal type='project' closeModal={() => setShowModal(false)} addInfo={(title:string, descr:string) => addNewProject(title, descr)}/> : null}
            <section className={styles.rootWrapper}>
                <div className={styles.header}>
                    <p className={styles.projectsCount}>You have <span>{`${projects.length}`}</span> active projects.</p>
                    <p onClick={() => setShowModal(true)} className={styles.projectsCount}><img src={IconsEnum.ADD_ICON} alt='add'/>Add new project</p>
                </div>
                {
                    projects.length === 0 ? 
                    <div className={styles.placeholderWrapper} onClick={() => setShowModal(true)}>
                        <p>You don't have projects :( </p>
                        <p>Click to create now!</p>
                    </div> : 
                    <AllProjects/>
                }
            </section>
        </div>
    )
}

