import React from 'react';
import './App.css';
import {BrowserRouter as Router ,Route,Switch,} from 'react-router-dom'
import Header from './Components/Header';
import Footer from './Components/Footer';
import {Container} from 'react-bootstrap'
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import Profilescreen from './Screens/ProfileScreen';
import TemplateScreen from './Screens/TemplateScreen';
import HomeScreen from './Screens/HomeScreen';
import StepTwoRegisterScreen from './Screens/StepTwoRegisterScreen';
import TemplateEditScreen from './Screens/templateEditScreen';
import PaymentsScreen from './Screens/PaymentsScreen';
import PurchasedTemplateScreen from './Screens/PurchasedTemplateScreen';
function App() {
  return (
    <Router>
    <Header/>
    <main className="py-3">
      <Container>
        <Route path="/" component={HomeScreen} exact/>
        <Route path='/template/:id' component={TemplateScreen} />
        <Route path='/profile/:id/edit' component={TemplateEditScreen} />
        
        <Route path="/login" component={LoginScreen}/>
        <Route path='/register' component={RegisterScreen} exact/>
        <Route path='/register/two' component={StepTwoRegisterScreen} />
        <Route path='/profile' component={Profilescreen} exact/>
        <Route path='/payment/:id/' component={PaymentsScreen} />
        <Route path='/download/:id/' component={PurchasedTemplateScreen} />
        


      </Container>

    </main>
    <Footer/>
  </Router>
  );
}

export default App;
