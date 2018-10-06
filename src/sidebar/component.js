import React from 'react';
import { Sidebar, Menu, Form, Button, Input } from 'semantic-ui-react';
class EditSidebar extends React.Component {
    constructor(props) {
        super(props)
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
                    <React.Fragment>
                        <Form.Field>
                            <label>Selected link label:</label>
                        </Form.Field>
                        <Form.Group inline>
                            <Input style={{ width: '85%' }} action={{ color: 'red', icon: 'trash alternate', onClick: (e) => { this.onRemoveLabel(e, selectedEditLink) } }} defaultValue={this.props.selectedLabel} onChange={(e) => { this.props.onSelectedLinkLabel(e) }} />
                        </Form.Group>
                    </React.Fragment>
                }
                <Form>
                    <Form.Field>
                        <Button type="button" onClick={(e => { this.props.handleSidebarChange(false, '') })} negative>Cancel</Button>
                        <Button type="button" onClick={(e => { this.props.onSaveLabel(this.props.selectedLinkId, this.props.selectedLabel) })} positive>Save</Button>
                    </Form.Field>
                </Form>
            </Sidebar>
        )
    }
}

export default EditSidebar;