import Mainroutes from "./routes/Mainroutes"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div className="py-10 px-[10%] w-screen h-screen bg-gray-800 text-white font-thin "> 
    <Navbar/>
      <Mainroutes />
    </div>
  )
}

export default App