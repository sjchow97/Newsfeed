import logo from "./logo.svg";
import Comment from "./components/comment/Comment";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>hello world this is the frontend</h1>
          <Comment />
        </div>
      </header>
    </div>
  );
}

export default App;
