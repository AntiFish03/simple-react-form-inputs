import React from 'react';
import PropTypes from 'prop-types';
import SimpleInput from './simple-input';
import debounce from 'lodash.debounce';
import classnames from 'classnames';

/** @extends React.PureComponent */
class AutoComplete extends SimpleInput {
  constructor(props) {
    super(props);

    const {
      suggestions
    } = props;

    this.state = Object.assign({},this.state, {
      suggestions,
      cursor: 0
    });

    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);

    this.onBlur = this.onBlur.bind(this);
    this.onBlur = debounce(this.onBlur, 200);
    this.onFocus = this.onFocus.bind(this);
  }

  componentWillUnmount() {
    this.onBlur.cancel();
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);

    if ( this.props.suggestions !== prevProps.suggestions || this.props.fieldFocused !== prevProps.fieldFocused) {
      this.setState( prevState => Object.assign({}, prevState, {
        ...this.props.suggestions !== prevProps.suggestions && { suggestions: this.props.suggestions },
        ...this.props.fieldFocused !== prevProps.fieldFocused && { fieldFocused: this.props.fieldFocused },
      }) );
    }

  }

  render() {
    const {
      id,
      labelClassName,
      wrapperClassName,
      fieldFocused
    } = this.state;

    const {
      dropDownOpenClass
    } = this.props;

    let dropDownClasses = {};

    dropDownClasses[dropDownOpenClass] = fieldFocused;

    return (
      <div className={wrapperClassName}>
        <label
          htmlFor={id}
          className={labelClassName}
        >
          {this.generateTitle()}
        </label>
        <div className={classnames('dropdown', dropDownClasses)}>
          {this.generateInput()}
          {this.generateSuggestions()}
        </div>
      </div>
    );
  }

  generateSuggestions() {
    const {
      suggestions,
      fieldFocused,
      cursor
    } = this.state;

    const {
      handleSuggestionClick
    } = this;

    if (suggestions.length > 0 && fieldFocused) {
      return (
        <ul ref={node => this.suggestionsList = node} className={classnames('dropdown-menu', 'col-xs-12')}>
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={handleSuggestionClick.bind(null, item)}
              className={classnames({active: i === cursor })}
            >
              {this.suggestionIcon()}
              {item.title}
            </li>
          ))}
        </ul>
      );
    }
  }

  suggestionIcon(category) {
    const icon = Object.keys(this.props.categoryIconMapping).includes(category) ?
      this.props.categoryIconMapping[category] : this.props.defaultSuggestionIcon;

    return typeof(icon) === 'string' ? (
        <i className={classnames(this.props.iconClassPrefix, icon)} />
      ) : ( {icon} );
  }

  onFocus(evt) {
    this.onBlur.cancel();
    this.setState(prevState => Object.assign({}, prevState, {fieldFocused: true}));

    if (typeof(this.props.onFocus) === 'function') {
      this.props.onFocus(evt);
    }
  }

  onBlur(evt) {
    this.setState(prevState => Object.assign({}, prevState, {fieldFocused: false}));

    if (typeof(this.props.onBlur) === 'function') {
      this.props.onBlur(evt);
    }
  }

  handleSuggestionClick(item) {
    if (item && item.title) {
      const {
        name,
        controlFunc
      } = this.props;
      let rtn = {};

      rtn[name] = item.title;
      controlFunc(rtn);

      this.setState({content: item.title});
    }
  }

  onKeyDown(evt) {
    const {cursor, suggestions} = this.state;
    this.onBlur.cancel();

    switch(evt.keyCode) {
    case 38: // Up
      if(cursor > 0) {
        this.setState( prevState => ({
          cursor: prevState.cursor - 1
        }));
        this.suggestionsList.scrollTop -= this.suggestionsList.childNodes[this.state.cursor].scrollHeight;
      }
      break;
    case 40: // Down
      if (cursor < suggestions.length) {
        this.setState( prevState => ({
          cursor: prevState.cursor + 1
        }));

        this.suggestionsList.scrollTop += this.suggestionsList.childNodes[this.state.cursor].scrollHeight;
      }
      break;

    case 13: // Fall-through
    case 9: // Fall-through
      this.handleSuggestionClick(suggestions[cursor]);
      break;

    case 27:
      this.onBlur();
      break;
    }
  }
}

AutoComplete.propTypes = Object.assign({}, SimpleInput.propTypes, {
  suggestions: PropTypes.array.isRequired,
  inputType: PropTypes.oneOf(['text']).isRequired,
  fieldFocused: PropTypes.bool,
  menuOpen: PropTypes.bool,
  dropDownOpenClass: PropTypes.string,
  defaultSuggestionIcon: PropTypes.oneOfType([
    PropTypes.string, PropTypes.node
  ]),
  categoryIconMapping: PropTypes.object
});

AutoComplete.defaultProps = Object.assign({}, SimpleInput.defaultProps, {
  suggestions: [],
  inputType: 'text',
  fieldFocused: false,
  menuOpen: false,

  categoryIconMapping: {
    city: 'fa-building',
    airport: 'fa-plane',
    location: 'fa-location-arrow',
  },
  defaultSuggestionIcon: 'fa-map-marker',
  autocomplete: 'off',
  dropDownOpenClass: 'open'
});

export default AutoComplete;
