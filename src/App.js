import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateEvent from "./components/CreateEvent";
import TodoMain from "./components/TodoMain";

function App() {
    return (
        <div>
            <CreateEvent />
            <TodoMain />
        </div>
    );
}

export default App;
