import Mainroutes from "./routes/Mainroutes"
import Nav from "./components/Nav"
import { useEffect } from "react"
import { asynccurrentuser } from "./store/actions/userActions"
import { useDispatch, useSelector } from "react-redux"
import { asyncloadproducts } from "./store/actions/productActions"
import { ToastContainer } from "react-toastify"

const App = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.userReducer)
  const { products } = useSelector((state) => state.productReducer)

  useEffect(() => {
    !users && dispatch(asynccurrentuser())
  }, [users])

  useEffect(() => {
    products.length == 0 && dispatch(asyncloadproducts())
  }, [products])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Mainroutes />
      </main>
    </div>
  )
}

export default App
