import './App.css';
import Connection from './connexion/';

function App() {
  return (
    <div className="App">
      <div className='bandeau'>
        <h2 className='icone'>tout</h2>
      </div>
      <header className="App-header">
        <Connection/>
      </header>
    </div>
  );
}

export default App;
