import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import './App.css';
import { UserProvider } from './context/UserContext';
import Products from './components/Products';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='/shop' element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
