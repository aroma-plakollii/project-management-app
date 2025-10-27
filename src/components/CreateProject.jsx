import { useRef } from "react";
import Input from "./Input";

const CreateProject = ({errors, onCreateProject, onCancleIsCreating}) => {
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    return (
        <div className="w-8/12 mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <button onClick={onCancleIsCreating} className="text-stone-800 hover:text-stone-950">Cancel</button>
                <button onClick={() => onCreateProject(title, description, dueDate)} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>
            </menu>
            <form>
                <Input error={errors.title} ref={title} label={'Title'} type="text" />
                <Input error={errors.description}  ref={description} label={'Description'} textarea={true} />
                <Input error={errors.dueDate}  ref={dueDate} label={'Due date'} type="date" />
            </form>
        </div>
    )
}

export default CreateProject;