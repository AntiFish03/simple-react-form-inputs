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
      suggestions
    });

    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);

    this.onBlur = this.onBlur.bind(this);
    this.onBlur = _.debounce(this.onBlur, 200);
  }

  componentWillUnmount() {
    this.onBlur.cancel();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.suggestions !== this.state.suggestions) {
      this.setState({
        suggestions: nextProps.suggestions
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

    return (
      <div className={wrapperClassName}>
        <label
          htmlFor={id}
          className={labelClassName}
        >
          {this.generateTitle()}
        </label>
        <div className={classnames('dropdown', {'open': fieldFocused})}>
          {this.generateInput()}
          {this.generateSuggestions()}
        </div>
      </div>
    );
  }

  generateSuggestions() {
    const {
      suggestions,
      fieldFocused
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
        <ul className={classnames('dropdown-menu', 'col-xs-12')}>
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={handleSuggestionClick.bind(null, item)}
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
    this.setState({fieldFocused: true});
  }

  onBlur() {
    this.setState({fieldFocused: false});
  }

  handleSuggestionClick(item) {
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

AutoComplete.propTypes = _.merge({}, SimpleInput.propTypes, {
  suggestions: PropTypes.array.isRequired,
  inputType: PropTypes.oneOf(['text']).isRequired,
  fieldFocused: PropTypes.bool,
  menuOpen: PropTypes.bool
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
  autocomplete: 'off'
});

export default AutoComplete;
