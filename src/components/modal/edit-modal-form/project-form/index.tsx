import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { editProject } from '../../../../redux/slices/projectsSlice';
import { hideModal } from '../../../../redux/slices/modalSlice';

import styles from '../../styles.module.scss';

interface ProjectFormProps {
    innerRef: any,
}

interface ErrorMessageInterface {
    descrError?: string, 
    titleError?: string,
}

const ProjectForm = ({innerRef}:ProjectFormProps) => {
    const id = useSelector((state: RootState) => state.modal.id);
    const [project] = useSelector((state: RootState) => state.projects.projects.filter(project => project.id === id));
    
    const [title, setTitle] = useState<string>('');
    const [descr, setDescr] = useState<string>('');
    const [errorMessages, setErrorMessages] = useState<ErrorMessageInterface>({descrError: '', titleError: ''});


    const dispatch = useDispatch();

    useEffect(() => {
        setTitle(project?.title ?? '');
        setDescr(project?.description ?? '');
    }, [project]);

    const handleSubmitForm = (event: any) => {
        event.preventDefault();

        if (title !== '' && title.trim()) {
            if (descr !== '' && descr.trim()) {
                editProjectData(id, title, descr);
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

    const editProjectData = (projectId: string, newTitle: string, newDescr: string) => {
        dispatch(editProject({projectId, newTitle, newDescr}))
    }

    return (
        <form className={styles.addForm} onSubmit={(e) => handleSubmitForm(e)}>
            <label>
                Project title:
                <input id='title' maxLength={25} ref={innerRef} type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
            </label>
            <div className={styles.errorMessageBlock}>
                <p>{errorMessages.titleError ? errorMessages.titleError : null}</p>
            </div>
            <label>
                Project description:
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
}

export default ProjectForm;