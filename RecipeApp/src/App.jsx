import Mainroutes from "./routes/Mainroutes"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <Navbar />
      <main>
        <Mainroutes />
      </main>
    </div>
  )
}

export default App