import { useRef } from "react";

const ProjectDetails = ({project, selectedProject, onAddTasks}) => {
    const task = useRef();

    return (
        <div className="w-8/12 mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
                    <button className="text-stone-600 hover:text-stone-950">Delete</button>
                </div>
                <p className="mb-4 text-stone-400">{project.dueDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
            </header>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <div className="flex items-center gap-4">
                <input ref={task} className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
                <button onClick={() => onAddTasks(task, selectedProject)} className="text-stone-700 hover:text-stone-950">Add Task</button>
            </div>
            {project.tasks.length > 0 ? 
            (<ul  className="p-4 mt-8 rounded-md bg-stone-100">
               {project.tasks.map((task, index) => (
                <li key={index} className="flex justify-between my-4">
                    <p className="text-stone-800 my-4">{task}</p>
                    <button className="text-stone-700 hover:text-red-500">Clear</button>
                </li>
               ))}
            </ul>)
            :
            (<p className="text-stone-800 my-4">This project does not have any tasks yet</p>)}
        </div>
    )
}

export default ProjectDetails;