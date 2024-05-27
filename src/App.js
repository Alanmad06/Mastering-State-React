
import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Community } from './components/Community';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Subscribe } from './components/Subscribe';
import { communityContext } from './context/CommunityProvider';

function App() {


 



  return (
    <>
   <Header/>
   <Main/>
   <Community/>
   <Subscribe/>
   <Footer/>
   
   </>
  
  );
}

export default App;
