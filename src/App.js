import React from 'react'
import { List, ListItem } from 'material-ui/List'

import Button from './Button'
import { TextField } from 'material-ui'
import Paper from './Paper'

class App extends React.Component {
  state = {
    tasks: [
      { taskName: "Odkurzanie", completed: false },
      { taskName: "Zmywanie", completed: false }
    ],
    taskName: ''
  }

  handleChange = (event) => this.setState({ taskName: event.target.value })

  handleClick = (event) => {
    if (this.state.taskName !== '') {
      let tasks = this.state.tasks
      const newTask = { taskName: this.state.taskName, completed: false }
      tasks.push(newTask)
      this.setState({ tasks, taskName: '' })
      fetch('https://poniedzialek-26.firebaseio.com/tasks.json', {
        method: 'POST',
        body: JSON.stringify(newTask)
      }
      )
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
