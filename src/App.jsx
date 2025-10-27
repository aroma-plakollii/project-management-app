import { useState } from 'react'
import Sidebar from './components/Sidebar'
import CreateProject from './components/CreateProject'
import NoProject from './components/NoProject';
import ProjectDetails from './components/ProjectDetails';
import Modal from './components/Modal';

function App() {
  const [isCreating, setIsCreating] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    dueDate: false,
    task: false
  })

  const handleIsCreating = () => {
    setIsCreating(true);
    setSelectedProject(null)
  };

  const handleCancleIsCreating = () => setIsCreating(false);

  const handleCreateProject = (title, description, dueDate) => {
    setErrors({
      title: !title.current.value,
      description: !description.current.value,
      dueDate: !dueDate.current.value
    })

    if(title.current.value && description.current.value && dueDate.current.value){
      setProjects((prevProjects) => {
        const updatedProjects = [...prevProjects];
  
        return [
          ...updatedProjects,
          {
            title: title.current.value,
            description: description.current.value,
            dueDate: dueDate.current.value,
            tasks: []
          }
        ]
      });
  
      handleCancleIsCreating();
    }
  }

  const handleSelectedProject = (index) => setSelectedProject(index); 

  const handleAddTasks = (task, selectedProject) => {
    setErrors({
      ...errors,
      task: !task.current.value
    })

    if(task.current.value){
      setProjects((prevProjects) =>
        prevProjects.map((project, index) => {
          if (index === selectedProject) {
            return {
              ...project,
              tasks: [...project.tasks, task.current.value],
            };
          }
          return project;
        })
      );
    }
  };

  const handleDeleteProject = (index) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects.splice(index, 1);

      return updatedProjects;
    });

    setSelectedProject(null);
  }

  const handleClearTask = (selectedProject, index) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project, projectIndex) => {
        if (projectIndex === selectedProject) {
          return {
            ...project,
            tasks: project.tasks.filter((task, taskIndex) => taskIndex !== index),
          };
        }
        return project;
      });
    });
  };

  return (
      <main className="h-screen my-8 flex gap-8">
        <Sidebar projects={projects} onIsCreating={handleIsCreating} onSelectedProject={handleSelectedProject} />
        {(!isCreating && selectedProject === null) && <NoProject onIsCreating={handleIsCreating} />}
        {(isCreating && selectedProject === null) && <CreateProject errors={errors} onCreateProject={handleCreateProject} onCancleIsCreating={handleCancleIsCreating} />}
        {selectedProject !== null && <ProjectDetails error={errors.task} project={projects[selectedProject]} selectedProject={selectedProject} onAddTasks={handleAddTasks} onDeleteProject={handleDeleteProject} onClearTask={handleClearTask} />}
        <Modal />
      </main>
  )
}

export default App
