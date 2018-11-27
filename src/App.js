import React from 'react'
import { List, ListItem } from 'material-ui/List'

import Button from './Button'
import { TextField } from 'material-ui'
import Paper from './Paper'

const apiURL = 'https://poniedzialek-26.firebaseio.com'

class App extends React.Component {
  state = {
    tasks: [],
    taskName: ''
  }

  componentWillMount() {
    fetch(`${apiURL}/tasks.json`)
      .then(response => response.json())
      .then(data => {
        const array = Object.entries(data)
        const tasksList = array.map(task => task[1])
        this.setState({ tasks: tasksList })
      })
  }

  handleChange = (event) => this.setState({ taskName: event.target.value })

  handleClick = (event) => {
    if (this.state.taskName !== '') {
      let tasks = this.state.tasks
      const newTask = { taskName: this.state.taskName, completed: false }
      fetch(`${apiURL}/tasks.json`, {
        method: 'POST',
        body: JSON.stringify(newTask)
      }
      )
        .then(() => {
          tasks.push(newTask)
          this.setState({ tasks, taskName: '' })
        })
    }
  }

  render() {
    return (
      <div>
        <Paper>
          <TextField
            type="text"
            hintText="Add task"
            onChange={this.handleChange}
            value={this.state.taskName}
          >
          </TextField>
          <Button
            label="Add"
            onClick={this.handleClick}
          >
          </Button>
        </Paper>
        <Paper>
          <List>
            {this.state.tasks.map((task, index) => (<ListItem primaryText={task.taskName}></ListItem>))}
          </List>
        </Paper>
      </div>
    )
  }
}

export default App
