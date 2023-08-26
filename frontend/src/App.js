import { Button } from '@chakra-ui/react';
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
// import { Button, ButtonGroup } from '@chakra-ui/react'
function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact/>
      <Route path="/chats" component={ChatPage}/>
      {/* <Route path="/chat"/> */}
    </div>
  );
}

export default App;
