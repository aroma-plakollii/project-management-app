import { useRef, useState } from "react";
import Input from "./Input";

const CreateProject = ({onCreateProject, onCancleIsCreating}) => {
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const [error, setError] = useState({
        title: false,
        description: false,
        dueDate: false
    }) 

    const handleCreateProject = () => {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        setError({
            title: enteredTitle.trim() === '',
            description: enteredDescription.trim() === '',
            dueDate: enteredDueDate.trim() === ''
        });

        if(enteredTitle.trim() !== '' && enteredDescription.trim() !== '' && enteredDueDate.trim() !== ''){
            const newProject = {
                id: Math.random(),
                title: enteredTitle,
                description: enteredDescription,
                dueDate: enteredDueDate
            }
            onCreateProject(newProject)
        }
    }

    return (
        <div className="w-8/12 mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <button onClick={onCancleIsCreating} className="text-stone-800 hover:text-stone-950">Cancel</button>
                <button onClick={handleCreateProject} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
            </menu>
            <form>
                <Input error={error.title} ref={title} label={'Title'} type="text" />
                <Input error={error.description} ref={description} label={'Description'} textarea />
                <Input error={error.dueDate} ref={dueDate} label={'Due date'} type="date" />
            </form>
        </div>
    )
}

export default CreateProject;