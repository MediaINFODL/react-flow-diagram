import React, { Component } from 'react';
import { Sidebar, Menu, Form, Button, Input } from 'semantic-ui-react';

type StatusSidebarProps = {
  currentStatus: string,
  statusId: string
};

class StatusSidebar extends Component<StatusSidebarProps> {
  constructor(props) {
    super(props);
    this.state = {
      currentStatus: this.props.currentStatus,
      initStatus: this.props.currentStatus,
      statusId: this.props.statusId
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        currentStatus: nextProps.currentStatus,
        initStatus: nextProps.currentStatus,
        statusId: nextProps.statusId
      });
    }
  }

  onSave = () => {
    console.log('save emmiter', this.state);
    this.props.handleEmitStatusSave(this.state);
  };

  onClose = () => {
    console.log('close emmiter', this.state);
    this.props.handleEmitSidebarChange();
  };

  onKeypress = (e) => {
    this.setState({ currentStatus: e.target.value });
    console.log(this.state);
  };

  onRemove = (e) => {
    console.log(e);
    console.log('delete emmiter', this.state);
    this.props.handleEmitStatusDelete(this.state);
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
                     onClick: e => this.onRemove(this.state.statusId)
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
