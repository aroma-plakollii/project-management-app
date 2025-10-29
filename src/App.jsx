import { useState } from 'react'
import Sidebar from './components/Sidebar'
import CreateProject from './components/CreateProject'
import NoProject from './components/NoProject';
import ProjectDetails from './components/ProjectDetails';
import Modal from './components/Modal';

function App() {
  const [projectState, setProjectState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: []
  })
  // const [isCreating, setIsCreating] = useState(false);
  // const [projects, setProjects] = useState([]);
  // const [selectedProject, setSelectedProject] = useState(null);
  // const [errors, setErrors] = useState({
  //   title: false,
  //   description: false,
  //   dueDate: false,
  //   task: false
  // })

  const handleIsCreating = () => {
    setProjectState((prevState) =>{ 
    return {
      ...prevState,
      selectedProject: null
    }})
  }

  const handleCancleIsCreating = () => {
    setProjectState((prevState) =>{ 
    return {
      ...prevState,
      selectedProject: undefined
    }})
  }

  const handleCreateProject = (newProject) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: [
          ...prevState.projects,
          newProject
        ]
      }
    });
  
    handleCancleIsCreating();
  }

  const handleSelectedProject = (id) => {
    setProjectState((prevState) =>{ 
      return {
        ...prevState,
        selectedProject: id
      }})
  } 

  const handleAddTasks = (task) => {
    setProjectState((prevState) =>{
     return {
      ...prevState,
      tasks: [
        ...prevState.tasks,
        task
      ]
     }
    })
  };

  const handleDeleteProject = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.filter(project => project.id !== id)
      }
    })
  }

  const handleClearTask = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)
      }
    })
  };

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProject);

  let content = (
    <ProjectDetails
    project={selectedProject}
    onAddTasks={handleAddTasks}
    onDeleteProject={handleDeleteProject}
    onClearTask={handleClearTask} />
  )

  if(projectState.selectedProject === undefined){
    content = (
      <NoProject onIsCreating={handleIsCreating} />
    )
  }else if(projectState.selectedProject === null){
    <CreateProject onCreateProject={handleCreateProject} onCancleIsCreating={handleCancleIsCreating} />
  }
  return (
      <main className="h-screen my-8 flex gap-8">
        <Sidebar projects={projectState.projects} onIsCreating={handleIsCreating} onSelectedProject={handleSelectedProject} />
        { content }
      </main>
  )
}

export default App
