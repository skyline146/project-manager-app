import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../redux/slices/projectsSlice';
import { useNavigate } from 'react-router-dom';

import { IconsEnum } from '../../helpers/themes';
import { stylesJoint } from '../../helpers/utils';
import styles from './styles.module.scss';

interface IProjectBoxProps {
    title: string;
    id: string;
    description: string,
    status?: string,
    createdAt: string [],
}

export const ProjectBox = ({title, id, description, status, createdAt}:IProjectBoxProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className={styles.rootWrapper} onClick={() => navigate(`/project/${id}`)}>
            <div className={styles.projectHeader}>
                <div className={styles.projectMainInfo}>
                    <div className={status === 'progress' ? styles.projectStatus : stylesJoint(styles.projectStatus, styles.projectDone)}>
                        <p>{status === 'progress' ? 'In progress' : 'Done'}</p>
                    </div>
                    <p className={styles.projectTitle}>{title}</p>
                </div>
                <div className={styles.controlButtonsWrapper} onClick={(e) => e.stopPropagation()}>
                    <span className={styles.controlButton} style={{backgroundColor: 'rgb(221, 168, 108)'}} data-title='Edit project'><img src={IconsEnum.EDIT_ICON} alt='edit'/></span>
                    <span className={styles.controlButton} onClick={() => dispatch(deleteProject(id))} data-title='Delete project'><img src={IconsEnum.DELETE_ICON} alt='delete'/></span>
                </div>
            </div>
            <p>{description}</p>
            <div className={styles.projectDate}>
                <p>Created at: {`${createdAt[0]} ${createdAt[1]}`}</p>
            </div>
        </div>
    )
}