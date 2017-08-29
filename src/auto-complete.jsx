import React, { PropTypes } from 'react';
import SimpleInput from './simple-input';
import _ from 'lodash';
import classnames from 'classnames';

class AutoComplete extends SimpleInput {
  constructor(props) {
    super(props);

    const {
      suggestions
    } = props;

    this.state = _.merge({},this.state, {
      suggestions,
      cursor: 0
    });

    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);

    this.onBlur = this.onBlur.bind(this);
    this.onBlur = _.debounce(this.onBlur, 200);
    this.onFocus = this.onFocus.bind(this);
  }

  componentWillUnmount() {
    this.onBlur.cancel();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.suggestions !== this.state.suggestions) {
      this.setState({
        suggestions: nextProps.suggestions,
        cursor: 0
      });
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
      categoryIconMapping,
      iconClassPrefix,
      defaultSuggestionIcon
    } = this.props;

    const {
      handleSuggestionClick
    } = this;

    if (suggestions.length > 0 && fieldFocused) {
      return (
        <ul ref="suggestions" className={classnames('dropdown-menu', 'col-xs-12')}>
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={handleSuggestionClick.bind(null, item)}
              className={classnames({active: i === cursor })}
            >
              {Object.keys(categoryIconMapping).includes(item.category) && (
                <i className={
                  classnames(iconClassPrefix,categoryIconMapping[item.category])
                } />
              )}

              {!Object.keys(categoryIconMapping).includes(item.category) && (
                <i className={
                  classnames(iconClassPrefix, defaultSuggestionIcon)
                } />
              )}

              {item.title}
            </li>
          ))}
        </ul>
      );
    }
  }

  onFocus() {
    this.onBlur.cancel();
    this.setState({fieldFocused: true});
  }

  onBlur() {
    this.setState({fieldFocused: false});
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
        this.refs.suggestions.scrollTop -= this.refs.suggestions.childNodes[this.state.cursor].scrollHeight;
      }
      break;
    case 40: // Down
      if (cursor < suggestions.length) {
        this.setState( prevState => ({
          cursor: prevState.cursor + 1
        }));

        this.refs.suggestions.scrollTop += this.refs.suggestions.childNodes[this.state.cursor].scrollHeight;
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

AutoComplete.propTypes = _.merge({}, SimpleInput.propTypes, {
  suggestions: PropTypes.array.isRequired,
  inputType: PropTypes.oneOf(['text']).isRequired,
  fieldFocused: PropTypes.bool,
  menuOpen: PropTypes.bool,
  dropDownOpenClass: PropTypes.string
});

AutoComplete.defaultProps = _.merge({}, SimpleInput.defaultProps, {
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
