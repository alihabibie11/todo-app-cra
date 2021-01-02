import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
//component
import Header from './component/layout/Header';
import AddTodo from "./component/AddTodo";
import About from "./component/pages/About.js";
import Todos from "./component/Todos";
//end of component
import axios from 'axios'
import './App.css';
// import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    //array-object
    todos: []
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState({ todos: res.data }))
  }

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
        axios
          .get(`https://jsonplaceholder.typicode.com/todos?/${id}`)
          .then((res) =>
            this.setState({
              todos: [...this.state.todos.filter((todo) => todo.id !== id)],
            }));

  };

  //add Todo
  addTodo = (title) => {
        axios
          .post("https://jsonplaceholder.typicode.com/todos", {
            title,
            completed: false
          })
            .then((res) => this.setState({ todos: [...this.state.todos, res.data] })
          );
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
