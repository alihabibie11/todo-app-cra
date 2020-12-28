import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

//component
import Header from './component/layout/Header';
import AddTodo from "./component/AddTodo";
import About from "./component/pages/About.js";
import Todos from "./component/Todos";
//end of component

import './App.css';
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    //array-object
    todos: [
      {
        id: uuidv4(),
        title: "Take out the trash",
        completed: false,
      },
      {
        id: uuidv4(),
        title: "Dinner with my love",
        completed: false,
      },
      {
        id: uuidv4(),
        title: "Meeting with teachers",
        completed: false,
      },
    ],
  };

  //Method
  //Togle Todo
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          //togle
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  //Delete Todo
  delTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter((todo) => todo.id !== id)],
    });
  };

  //add Todo
  addTodo = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  render() {
    return (
      //Router for url and pages
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              //kelompokkan child dalam react.fragment
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  //sent/use the state to todos.js
                  todos={this.state.todos}
                  //sent/use the method to todo.js/other
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              </React.Fragment>
              //end child react fragment
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
      //end of router
    );
  }
}

export default App;
