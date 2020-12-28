import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {
    state = {
        title: ''
    }

    //method
    //
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: '' });
    }

    //change the value of 'title' from value/state
    onChange = (e) => this.setState({ title: e.target.value });

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <input
                    type="text"
                    name="title"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="Add New Todo..."
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    value="Submit"
                    className="btn"
                    style={{flex: '1'}}
                />
            </form>
        )
    }
}

//prop type
AddTodo.propTypes = {
  addTodo: PropTypes.object.isRequired
};

export default AddTodo