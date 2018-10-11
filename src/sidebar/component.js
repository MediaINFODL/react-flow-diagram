import React from 'react';
import { Sidebar, Menu, Form, Button, Input } from 'semantic-ui-react';
class EditSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLabel: this.props.selectedLabel,
            initLabel: this.props.selectedLabel,
            selectedLinkId: this.props.selectedLinkId
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            this.setState({
                initLabel: nextProps.selectedLabel,
                selectedLabel: nextProps.selectedLabel,
                selectedLinkId: nextProps.selectedLinkId
            });
        }
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
                        <input type='text' name='title' value={this.state.selectedLabel} 
                                onChange={this.handleChange}/>
                            <Input style={{ width: '85%' }} action={{ color: 'red', icon: 'trash alternate', onClick: (e) => { this.onRemoveLabel(e, selectedEditLink) } }} value={this.state.selectedLabel} onChange={(e) => { this.onSelectedLinkLabel(e) }} />
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
    handleChange(event) {
        this.setState({selectedLabel: event.target.value})
      }
    onSelectedLinkLabel(e) {
        this.setState({ selectedLabel: e.target.value })
    }
}

export default EditSidebar;