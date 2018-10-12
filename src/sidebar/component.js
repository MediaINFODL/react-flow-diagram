import React from 'react';
import { Diagram, store, setEntities, setConfig, diagramOn } from '../../src';
import { Sidebar, Menu, Form, Button, Input } from 'semantic-ui-react';
class EditSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLabel: this.props.selectedLabel,
            initLabel: this.props.selectedLabel,
            selectedLinkId: this.props.selectedLinkId,
            model:{}
        }
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.selectedLinkId != nextProps.selectedLinkId) {
            // console.log('to rerender false')
            return false
        } else {
            // console.log('to rerender true')
            return true;
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props == nextProps) {
            this.setState({
                initLabel: nextProps.selectedLabel,
                selectedLabel: nextProps.selectedLabel,
                selectedLinkId: nextProps.selectedLinkId
            });
        }
    }
    componentWillMount() {
        this.setState({
            model: store.getState()
        });
        console.log(this.state.model)
      }
    render() {
        return (
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                vertical
                visible={this.props.opened}
                direction='right'
                style={{ width: 412 }}
            >
                {this.props.selectedLabel &&
                    <div>
                        <Form.Field>
                            <label>Selected link label:</label>
                        </Form.Field>
                        <Form.Group inline>
<<<<<<< HEAD
                            {/* <input type='text' name='title' value={this.state.selectedLabel} 
                                onChange={this.handleChange}/> */}
                            <Input style={{ width: '85%' }} action={{ color: 'red', icon: 'trash alternate', onClick: (e) => { this.onRemoveLabel(e, selectedEditLink) } }} value={this.state.selectedLabel} onChange={(e) => { this.onSelectedLinkLabel(e) }} />
=======
                            <Input style={{ width: '85%' }} action={{ color: 'red', icon: 'trash alternate', onClick: (e) => { this.onRemoveLabel() } }} value={this.state.selectedLabel} onChange={(e) => { this.onSelectedLinkLabel(e) }} />
>>>>>>> f6df141ff892ec4305429daaa47d76b6331f6cb5
                        </Form.Group>
                    </div>
                }
                <Form>
                    <Form.Field>
                        <Button type="button" onClick={(e => { this.props.handleSidebarChange(false, '') })} negative>Cancel</Button>
                        <Button type="button" onClick={(e => { this.props.onSaveLabel(this.state.selectedLinkId, this.state.initLabel, this.state.selectedLabel) })} positive>Save</Button>
                    </Form.Field>
                </Form>
            </Sidebar>
        )
    }
<<<<<<< HEAD
    handleChange(event) {
        this.setState({ selectedLabel: event.target.value })
    }
=======
>>>>>>> f6df141ff892ec4305429daaa47d76b6331f6cb5
    onSelectedLinkLabel(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ selectedLabel: e.target.value })
    }
    onRemoveLabel(e){
        this.setState({ selectedLabel: '' })
        const state = store.getState();
        console.log(state)
    }
}

export default EditSidebar;