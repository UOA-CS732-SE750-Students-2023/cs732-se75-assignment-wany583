import { useState , useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { auth } from './components/Service'
import Table from './components/Table'
import LoginPage from './components/LoginPage'
import { apiGet } from './components/Service';
import SnackBar from './components/SnackBar'

function App() {
    const [data, setData] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
      apiGet(`product/list`)
      .then(res => setData(res.data.result))
      .catch(err => console.log(err))
    },[])
    
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage message={message} setMessage={setMessage}/>} />
        <Route path="/products" element={auth() ? <Table data={data} message={message} setMessage={setMessage}/> : <Navigate to="/" />} />
      </Routes>
      <SnackBar message={message} setMessage={setMessage} />
    </>
  )

}

export default App;