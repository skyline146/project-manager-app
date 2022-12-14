import React, {useState, memo} from 'react';
import {v4 as uuid} from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { addTask, addProject } from '../../../redux/slices/projectsSlice';
import { hideModal } from '../../../redux/slices/modalSlice';

import { ProjectInterface, TaskInterface } from '../../../ts';

import styles from '../styles.module.scss';

interface ErrorMessageInterface {
    descrError?: string, 
    titleError?: string,
}

interface IAddModalFormProps {
    innerRef: any,
    type: string,
}

export const AddModalForm = memo(({innerRef, type}:IAddModalFormProps) => {
    const projectId = useSelector((state: RootState) => state.modal.id);
    const [title, setTitle] = useState<string>('');
    const [descr, setDescr] = useState<string>('');
    const [errorMessages, setErrorMessages] = useState<ErrorMessageInterface>({descrError: '', titleError: ''});

    const dispatch = useDispatch();
    
    const handleSubmitForm = (event: any) => {
        event.preventDefault();

        if (title !== '' && title.trim()) {
            if (descr !== '' && descr.trim()) {
                if (type === 'project') {
                    addNewProject(title, descr);
                } else {
                    addProjectTask(title, descr);
                }

                setTitle('');
                setDescr('');
                setErrorMessages({descrError: '', titleError: ''});
                dispatch(hideModal());
            } else {
                setErrorMessages({descrError: `Description can't be empty!`});
            }
        } else {
            setErrorMessages({titleError: `Title can't be empty!`});
        }
    }

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

    const addProjectTask = (title: string, description: string) => {
        const newTask: TaskInterface = {
            id: uuid(),
            title,
            description,
            createdAt: [...new Date().toLocaleString().split(', ')]
        }

        dispatch(addTask({projectId, task: newTask}));
    }

    return (
        <form className={styles.addForm} onSubmit={(e) => handleSubmitForm(e)}>
            <label>
                {type === 'project' ? 'Project' : 'Task'} title:
                <input id='title' maxLength={25} ref={innerRef} type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
            </label>
            <div className={styles.errorMessageBlock}>
                <p>{errorMessages.titleError ? errorMessages.titleError : null}</p>
            </div>
            <label>
                {type === 'project' ? 'Project' : 'Task'} description:
                <textarea 
                    maxLength={800} 
                    className={styles.descrBox}
                    onChange={(e) => setDescr(e.target.value)}
                    value={descr}>
                </textarea>
            </label>
            <div className={styles.errorMessageBlock}>
                <p>{errorMessages.descrError ? errorMessages.descrError : null}</p>
            </div>
            <button className={styles.formButton}>Submit</button>
        </form>
    )
});