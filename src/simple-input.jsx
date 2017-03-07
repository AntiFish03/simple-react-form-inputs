import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import generateUUID from './utils/generate-uuid';

class SimpleInput extends Component {
  constructor(props) {
    super(props);

    const {
      content,
      fieldClasses,
      labelClasses,
      wrapperClasses,
      id
    } = props;

    this.state = {
      content,
      id: id || 'input-' + generateUUID(),
      fieldClassName: classnames('form-control', fieldClasses),
      labelClassName: classnames('form-control-label', labelClasses),
      wrapperClassName: classnames('form-group', wrapperClasses)
    };

    this.updateControlFunc = this.updateControlFunc.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  render() {
    const {
      id,
      labelClassName,
      wrapperClassName
    } = this.state;

    return (
      <div className={wrapperClassName}>
        <label
          htmlFor={id}
          className={labelClassName}
        >
          {this.generateTitle()}
        </label>
        {this.generateInput()}
      </div>
    );
  }
  generateInput() {
    const {
      id,
      fieldClassName,
      content,
    } = this.state;

    const {
      name,
      inputType,
      placeholder,
      iconDecorator,
      iconPosition,
      iconClassPrefix,
      autocomplete
    } = this.props;

    const field = (
      <input
        id={id}
        className={fieldClassName}
        name={name}
        type={inputType}
        value={content}
        onChange={this.updateControlFunc}
        placeholder={placeholder}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        autoComplete={autocomplete}
      />
    ),
      containerClasses = [
        'input-icon',
        'icon-' + iconPosition,
        name + '-wrapper'
      ];

    if (iconDecorator) {
      return (
        <div className={classnames(containerClasses)}>
          {field}
          {typeof(iconDecorator) === 'string' &&
            (<i className={classnames(iconClassPrefix, iconDecorator)} />)
          }
          {typeof(iconDecorator) === 'object' &&
            (iconDecorator)
          }
        </div>
      );
    }

    return field;
  }
  generateTitle() {
    const {
      title,
      titleMessage,
      titleSeparator
    } = this.props;

    if (titleMessage) {
      if (typeof(titleMessage) === 'string') {
        return title + titleSeparator + titleMessage;
      }

      return (
        <span>
          {title} {titleMessage}
        </span>
      );
    }

    return title;
  }

  updateControlFunc(evt) {
    const {
      name,
      controlFunc
    } = this.props;
    let rtn = {};

    rtn[name] = evt.target.value;
    controlFunc(rtn);

    this.setState({content: evt.target.value});
  }

  onFocus() {}
  onBlur() {}
  onKeyDown() {}
}

SimpleInput.propTypes = {
  // Required Inputs
  inputType: PropTypes.oneOf([
    'text',
    'number'
  ]).isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,

  // Optional
  titleMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  titleSeparator: PropTypes.string,
  placeholder: PropTypes.string,
  fieldClasses: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]),
  labelClasses: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]),
  wrapperClasses: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]),
  iconPosition: PropTypes.oneOf([
    'left',
    'right'
  ]),
  iconDecorator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  iconClassPrefix: PropTypes.string,
  id: PropTypes.string,
  autocomplete: PropTypes.oneOf(['on', 'off'])
};

SimpleInput.defaultProps = {
  iconPosition: 'left',
  iconDecorator: null,
  iconClassPrefix: 'fa',
  id: null,
  content: '',
  titleMessage: null,
  titleSeparator: ': ',
  autocomplete: 'on'
};

export default SimpleInput;
