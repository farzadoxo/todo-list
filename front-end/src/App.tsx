import NewTask from "./components/newTask"
import TodoList from "./home/todos"
import './mockSetup'; // Import the mock setup

function App() {

  return (

    <div className="w-full h-full ">
      <NewTask />
      <TodoList />

    </div>


  )
}

export default App
