import React, {useRef, useEffect} from 'react';
import type { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../redux/slices/modalSlice';

import { AddModalForm } from './add-modal-form';
import { EditModalForm } from './edit-modal-form';

import { IconsEnum } from '../../helpers/themes';
import styles from './styles.module.scss';
import './styles.module.scss';
import { stylesJoint } from '../../helpers/utils';


export const Modal = () => {
    const isActive = useSelector((state: RootState) => state.modal.isActive);
    const type = useSelector((state: RootState) => state.modal.type);
    const action = useSelector((state: RootState) => state.modal.action);
    const inputRef = useRef<any>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        inputRef.current?.focus();
    }, [isActive]);

    const closeModal = () => {
        dispatch(hideModal());
    }

    if(isActive) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }

    const renderForm = () => {
        if (action === 'add') {
            return <AddModalForm innerRef={inputRef} type={type}/>
        } else if (action === 'edit') {
            return <EditModalForm innerRef={inputRef} type={type}/>
        } else {
            return;
        }
    }

    return (
        <div className={isActive ? stylesJoint(styles.modalWrapper, styles.showModal) : styles.modalWrapper}  
            onKeyDown={(event) => event.key === 'Escape' ? closeModal() : null}
            onClick={closeModal}>
            <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <p>{action === 'edit' ? 'Edit' : 'Add new'} {type === 'project' ? 'project' : 'task'}</p>
                    <div>
                        <img src={IconsEnum.CLOSE_ICON} alt='close' onClick={closeModal}/>
                    </div>
                </div>
                {renderForm()}
            </div>
        </div>
    )
}