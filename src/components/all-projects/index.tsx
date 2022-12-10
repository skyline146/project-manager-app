// import { useState, useEffect } from 'react';
import type { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

import { ProjectBox } from '../project-box';

import styles from './styles.module.scss';

export const AllProjects = () => {
    const projects = useSelector((state: RootState) => state.projects.projects);

    return (
        <div className={styles.projectsTable}>
            {projects.map(({id, title, status, description, createdAt}) => {
                return (
                        <ProjectBox 
                            key={id} 
                            id={id} 
                            title={title} 
                            status={status} 
                            description={description}
                            createdAt={createdAt}/>
                )
            })}
        </div>
    )
}