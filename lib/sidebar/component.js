'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditSidebar = function (_React$Component) {
    _inherits(EditSidebar, _React$Component);

    function EditSidebar(props) {
        _classCallCheck(this, EditSidebar);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {
            selectedLabel: _this.props.selectedLabel,
            initLabel: _this.props.selectedLabel,
            selectedLinkId: _this.props.selectedLinkId,
            model: {}
        };
        return _this;
    }

    EditSidebar.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        if (this.props.selectedLinkId != nextProps.selectedLinkId) {
            // console.log('to rerender false')
            return false;
        } else {
            // console.log('to rerender true')
            return true;
        }
    };

    EditSidebar.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (this.props == nextProps) {
            this.setState({
                initLabel: nextProps.selectedLabel,
                selectedLabel: nextProps.selectedLabel,
                selectedLinkId: nextProps.selectedLinkId
            });
        }
    };

    EditSidebar.prototype.componentWillMount = function componentWillMount() {
        this.setState({
            model: _.store.getState()
        });
        console.log(this.state.model);
    };

    EditSidebar.prototype.render = function render() {
        var _this2 = this;

        return _react2.default.createElement(
            _semanticUiReact.Sidebar,
            {
                as: _semanticUiReact.Menu,
                animation: 'overlay',
                icon: 'labeled',
                vertical: true,
                visible: this.props.opened,
                direction: 'right',
                style: { width: 412 }
            },
            this.props.selectedLabel && _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _semanticUiReact.Form.Field,
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        'Selected link label:'
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Form.Group,
                    { inline: true },
                    _react2.default.createElement(_semanticUiReact.Input, { style: { width: '85%' }, action: { color: 'red', icon: 'trash alternate', onClick: function onClick(e) {
                                _this2.onRemoveLabel(e, selectedEditLink);
                            } }, value: this.state.selectedLabel, onChange: function onChange(e) {
                            _this2.onSelectedLinkLabel(e);
                        } })
                )
            ),
            _react2.default.createElement(
                _semanticUiReact.Form,
                null,
                _react2.default.createElement(
                    _semanticUiReact.Form.Field,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Button,
                        { type: 'button', onClick: function onClick(e) {
                                _this2.props.handleSidebarChange(false, '');
                            }, negative: true },
                        'Cancel'
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Button,
                        { type: 'button', onClick: function onClick(e) {
                                _this2.props.onSaveLabel(_this2.state.selectedLinkId, _this2.state.initLabel, _this2.state.selectedLabel);
                            }, positive: true },
                        'Save'
                    )
                )
            )
        );
    };

    EditSidebar.prototype.onSelectedLinkLabel = function onSelectedLinkLabel(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ selectedLabel: e.target.value });
    };

    EditSidebar.prototype.onRemoveLabel = function onRemoveLabel(e) {
        this.setState({ selectedLabel: '' });
        var state = _.store.getState();
        console.log(state);
    };

    return EditSidebar;
}(_react2.default.Component);

exports.default = EditSidebar;
module.exports = exports['default'];