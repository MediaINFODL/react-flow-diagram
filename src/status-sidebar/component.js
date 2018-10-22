import React, { Component } from 'react';
import { Sidebar, Menu, Form, Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { removeEntity, setName } from '../entity/reducer';
import { assignEmptyStatusToStore, assignNewStatusToStore } from '../history/reducer';

type StatusSidebarProps = {};

class StatusSidebar extends Component<StatusSidebarProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSave = () => {
    console.log('save emmiter', this.props.status.id, this.props.status.name);
    if (this.props.status.name) {
      this.props.setName({
        id: this.props.status.id, name: this.props.status.name
      });
      this.props.assignEmptyStatusToStore();
    }
  };

  onClose = () => {
    this.props.assignEmptyStatusToStore();
  };

  onKeypress = (e) => {
    this.props.assignNewStatusToStore(e.target.value);
  };

  onRemove = (e) => {
    console.log('delete emmiter', e);
    this.props.removeEntity(this.props.status.id);
    this.props.assignEmptyStatusToStore();
  };

  render() {
    return (
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        vertical
        visible={!!this.props.status.id}
        direction='right'
        style={{ width: 400 }}
      >
        <div>
          <Form.Field>
            <label>Selected state title:</label>
          </Form.Field>
          <Form.Group inline>
            <Input style={{ width: '85%' }}
                   action={{
                     color: 'red',
                     icon: 'trash alternate',
                     onClick: e => this.onRemove(e)
                   }}
                   value={this.props.status.name}
                   onChange={this.onKeypress}/>
          </Form.Group>
        </div>
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

const mapStateToProps = state => ({ status: state.status });

export default connect(mapStateToProps, {
  setName,
  removeEntity,
  assignNewStatusToStore,
  assignEmptyStatusToStore
})(StatusSidebar);
