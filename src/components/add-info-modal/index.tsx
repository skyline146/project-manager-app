import React, {useState} from 'react';

import { IconsEnum } from '../../helpers/themes';
import styles from './styles.module.scss';
import './styles.module.scss';

interface IAddInfoModalProps {
    closeModal: () => void,
    addInfo: (x: string, y: string) => void,
    isShow?: boolean,
    type?: string,
    knownTitle?: string,
    knownDescr?: string
}

interface ErrorMessageInterface {
    descrError?: string, 
    titleError?: string,
}

export const AddInfoModal = ({closeModal, addInfo, type, knownTitle, knownDescr, isShow}:IAddInfoModalProps) => {
    const [title, setTitle] = useState<string>(knownTitle ?? '');
    const [descr, setDescr] = useState<string>(knownDescr ?? '');
    const [errorMessages, setErrorMessages] = useState<ErrorMessageInterface>({descrError: '', titleError: ''});

    const handleSubmitForm = (event: any) => {
        event.preventDefault();
        setErrorMessages({descrError: '', titleError: ''});
        if (title !== '' && title.trim()) {
            if (descr !== '' && descr.trim()) {
                addInfo(title, descr);
                setTitle('');
                setDescr('');
                closeModal();
            } else {
                setErrorMessages({descrError: `Description can't be empty!`});
            }
        } else {
            setErrorMessages({titleError: `Title can't be empty!`});
        }
    }

    return (
        <div style={{display: isShow ? 'flex' : 'none'}} className={styles.modalWrapper}  
            onKeyDown={(event) => event.key === 'Escape' ? closeModal() : null}
            onClick={closeModal}>
            <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <p>Add new {type === 'project' ? 'project' : 'task'}</p>
                    <div>
                        <img src={IconsEnum.CLOSE_ICON} alt='close' onClick={closeModal}/>
                    </div>
                </div>
                <form className={styles.addForm} onSubmit={(e) => handleSubmitForm(e)}>
                    <label>
                        {type === 'project' ? 'Project' : 'Task'} title:
                        <input maxLength={25} autoFocus type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
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
            </div>
        </div>
    )
}