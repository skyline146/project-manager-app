import React from 'react';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from '../../redux/slices/modalSlice';

import { AllProjects } from '../../components';

import { IoIosAddCircleOutline } from "react-icons/io";
import styles from './styles.module.scss';
import './styles.module.scss';

export const ProjectsPage = () => {
    const projects = useSelector((state: RootState) => state.projects.projects);

    const dispatch = useDispatch();

    let content: JSX.Element = <React.Fragment/>;

    if(projects.length === 0) {
        content = (
            <div className={styles.placeholderWrapper} onClick={() => dispatch(showModal({type: 'project', action: 'add'}))}>
                <p>You don't have projects :( </p>
                <p>Click to create now!</p>
            </div>
        )
        
    } else {
        content = <AllProjects/>
    }

    return (
        <div style={{height: '100%'}}>
            <section className={styles.rootWrapper}>
                <div className={styles.header}>
                    <p className={styles.projectsCount}>You have <span>{`${projects.length}`}</span> active {projects.length === 1 ? 'project' : 'projects'}.</p>
                    <p onClick={() => dispatch(showModal({type: 'project', action: 'add'}))} className={styles.projectsCount}><IoIosAddCircleOutline style={{color: 'rgb(237, 171, 18)'}}/>Add new project</p>
                </div>
                {content}
            </section>
        </div>
    )
}

