import React, { Component } from 'react';
import { Sidebar, Menu, Form, Button, Input } from 'semantic-ui-react';

type StatusSidebarProps = {
  open: boolean,
  currentStatus: string,
  statusId: string
};

class StatusSidebar extends Component<StatusSidebarProps> {
  constructor(props) {
    super(props);
    this.state = {
      currentStatus: this.props.currentStatus,
      initStatus: this.props.currentStatus,
      open: this.props.open,
      statusId: this.props.statusId
    };
    // this.onClose = this.onClose.bind(this);
  }

  onSave = () => {
    console.log('emit on save');
  };

  onClose = () => {
    console.log('emit on close');
  };

  onStatusChange(e) {
    this.setState({ currentStatus: e.target.value });
    console.log(this.state);
  }

  onKeypress = (e) => {
    this.setState({ currentStatus: e.target.value });
    console.log(this.state);
  };

  onRemove = (e) => {
    console.log(e);
  };

  render() {
    return (
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        vertical
        visible={this.props.open}
        direction='right'
        style={{ width: 400 }}
      >
        {this.props.currentStatus &&
        <div>
          <Form.Field>
            <label>Selected state title:</label>
          </Form.Field>
          <Form.Group inline>
            <Input style={{ width: '85%' }}
                   action={{
                     color: 'red',
                     icon: 'trash alternate',
                     onClick: this.onRemove
                   }}
                   value={this.state.currentStatus}
                   onChange={this.onKeypress}/>
          </Form.Group>
        </div>
        }
        <Form>
          <Form.Field>
            <Button type="button"
                    onClick={this.onClose}
                    negative>Cancel</Button>
            <Button type="button"
                    onClick={this.onSave}
                    positive>Save</Button>
          </Form.Field>
        </Form>
      </Sidebar>
    );
  }
}

export default StatusSidebar;
