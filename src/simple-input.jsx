import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
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
      fieldClassName: cx('form-control', fieldClasses),
      labelClassName: cx('form-control-label', labelClasses),
      wrapperClassName: cx('form-group', wrapperClasses)
    };

    this.updateControlFunc = this.updateControlFunc.bind(this);
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
      iconClassPrefix
    } = this.props;

    const field = (
      <input
        id={id}
        className={fieldClassName}
        name={name}
        type={inputType}
        value={content}
        onChange={this.updateControlFunc}
        placeholder={placeholder} />
    ),
      containerClasses = [
        'input-icon',
        'icon-' + iconPosition,
        name + '-wrapper'
      ];

    if (iconDecorator) {
      return (
        <div className={cx(containerClasses)}>
          {field}
          {typeof(iconDecorator) === 'string' &&
            (<i className={cx(iconClassPrefix, iconDecorator)} />)
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
  }
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
  id: PropTypes.string
};

SimpleInput.defaultProps = {
  iconPosition: 'left',
  iconDecorator: null,
  iconClassPrefix: 'fa',
  id: null,
  content: '',
  titleMessage: null,
  titleSeparator: ': '
};

export default SimpleInput;
