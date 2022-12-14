import ProjectForm from './project-form';


interface EditModalFormProps {
    innerRef: any,
    type: string,
}

export const EditModalForm = ({innerRef, type}:EditModalFormProps) => {

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
}