import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'



function App() {
  return (
    <Router>
      <>
        <Header />
        <main className='py-3' >
          <Container>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/product/:id' component={ProductScreen} />
            <Route exact path='/cart/:id?' component={CartScreen} />
          </Container>
        </main>
        <Footer />
      </>
    </Router>
  )
}

export default App
