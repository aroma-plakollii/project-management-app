import { useState } from 'react'
import Sidebar from './components/Sidebar'
import CreateProject from './components/CreateProject'
import NoProject from './components/NoProject';
import ProjectDetails from './components/ProjectDetails';

function App() {
  const [isCreating, setIsCreating] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleIsCreating = () => setIsCreating(true);

  const handleCancleIsCreating = () => setIsCreating(false);

  const handleCreateProject = (title, description, dueDate) => {
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

  const handleSelectedProject = (index) => setSelectedProject(index); 

  const handleAddTasks = (task, selectedProject) => {
    console.log(task, selectedProject);
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];

      updatedProjects.map((project, index) => (
        index === selectedProject ? updatedProjects[index].tasks.push(task.current.value) : [...project]
      ))

      return updatedProjects;
    })
  }

  return (
      <main className="h-screen my-8 flex gap-8">
        <Sidebar projects={projects} onIsCreating={handleIsCreating} onSelectedProject={handleSelectedProject} />
        {(!isCreating && selectedProject === null) && <NoProject onIsCreating={handleIsCreating} />}
        {(isCreating && selectedProject === null) && <CreateProject onCreateProject={handleCreateProject} onCancleIsCreating={handleCancleIsCreating} />}
        {selectedProject !== null && <ProjectDetails project={projects[selectedProject]} selectedProject={selectedProject} onAddTasks={handleAddTasks} />}
      </main>
  )
}

export default App
