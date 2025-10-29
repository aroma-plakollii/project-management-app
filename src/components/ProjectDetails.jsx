import { useRef, useState } from "react";
import Modal from "./Modal";

const ProjectDetails = ({project, tasks, onAddTasks, onDeleteProject, onClearTask}) => {
    const dialog = useRef();
    const task = useRef();
    const [taskIndex, setTaskIndex] = useState(null)
    const [error, setError] = useState(false);
    const projectTasks = tasks.filter(task => task.selectedProject === project.id);

    const handleModal = (type, id = null) => {
        console.log(type, id);
        dialog.current.open(type);
        if(type === 'task')
            setTaskIndex(id);
    }

    const handleAddTasks = () => {
        const enteredTask = task.current.value;

        setError(enteredTask.trim() === '');

        if(enteredTask.trim() !== ''){
            const newTask = {
                id: Math.random(),
                selectedProject: project.id,
                task: enteredTask,
            }

            task.current.value = ''
            onAddTasks(newTask);
        }
    }

    return (
        <>
            <Modal ref={dialog} taskIndex={taskIndex} selectedProject={project.id} onDeleteProject={onDeleteProject} onClearTask={onClearTask} />
            <div className="w-8/12 mt-16">
                <header className="pb-4 mb-4 border-b-2 border-stone-300">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
                        {/* <button onClick={() => onDeleteProject(selectedProject)} className="text-stone-600 hover:text-stone-950">Delete</button> */}
                        <button onClick={() => handleModal('project')} className="text-stone-600 hover:text-stone-950">Delete</button>
                    </div>
                    <p className="mb-4 text-stone-400">{project.dueDate}</p>
                    <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
                </header>
                <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
                <div className="flex items-center gap-4">
                    <input ref={task} className={`w-64 px-2 py-1 rounded-sm bg-stone-200 ${error ? 'border border-red-500' : ''}`} />
                    <button onClick={handleAddTasks} className="text-stone-700 hover:text-stone-950">Add Task</button>
                </div>
                {tasks.length > 0 ? 
                (<ul  className="p-4 mt-8 rounded-md bg-stone-100">
                    {projectTasks.map((task) => (
                        <li key={task.id} className="flex justify-between my-4">
                            <p className="text-stone-800 my-4">{task.task}</p>
                            {/* <button onClick={() => onClearTask(selectedProject, index)} className="text-stone-700 hover:text-red-500">Clear</button> */}
                            <button onClick={() => handleModal('task', task.id)} className="text-stone-700 hover:text-red-500">Clear</button>
                        </li>
                    ))}
                </ul>)
                :
                (<p className="text-stone-800 my-4">This project does not have any tasks yet</p>)}
            </div>
        </>
    )
}

export default ProjectDetails;