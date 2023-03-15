import "../styles/App.css";
import List from "./List";

const App = () => {
  return (
    <div>
      <header className="App-header">
        <p>Todo App</p>
      </header>
      <div className="container">
        <List />
      </div>
    </div>
  );
};

export default App;
