import React, {memo} from 'react';

import ProjectForm from './project-form';


interface EditModalFormProps {
    innerRef: any,
    type: string,
}

export const EditModalForm = memo(({innerRef, type}:EditModalFormProps) => {

    const renderForm = () => {
        if (type === 'project') {
            return <ProjectForm innerRef={innerRef}/>
        } else {
            return <div></div>
        }
    }

    return (
        renderForm()
    )
});