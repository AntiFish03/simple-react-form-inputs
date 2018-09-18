import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import generateUUID from './utils/generate-uuid';

class SimpleInput extends PureComponent {
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

  componentDidUpdate(prevProps) {
    if (
      this.props.fieldClasses !== prevProps.fieldClasses ||
      this.props.labelClasses !== prevProps.labelClasses ||
      this.props.wrapperClasses !== prevProps.wrapperClasses ||
      (this.props.content !== prevProps.content && this.props.content !== this.state.content)
    ) {
      this.setState( prevState => Object.assign({}, prevState, {
        ...this.props.fieldClasses !== prevProps.fieldClasses && { fieldClassName: classnames('form-control', this.props.fieldClasses) },
        ...this.props.labelClasses !== prevProps.labelClasses && { labelClassName: classnames('form-control-label', this.props.labelClasses) },
        ...this.props.wrapperClasses !== prevProps.wrapperClasses && { wrapperClassName: classnames('form-group', this.props.wrapperClasses) },
        ...(this.props.content !== prevProps.content && this.props.content !== this.state.content) && { content: this.props.content }
      }) );
    }
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
      autocomplete,
      dataProps
    } = this.props;

    const field = (
      <input
        id={id}
        className={fieldClassName}
        name={name}
        type={inputType}
        value={content}
        onChange={(e) => { e.persist(); this.updateControlFunc(e); }}
        placeholder={placeholder}
        onFocus={(e) => { e.persist(); this.onFocus(e); }}
        onBlur={(e) => { e.persist(); this.onBlur(e); }}
        onKeyDown={this.onKeyDown}
        autoComplete={autocomplete}
        { ...dataProps }
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
    if (typeof(this.props.onChange) === 'function') {
      this.props.onChange(evt);
    }

    const {
      name,
      controlFunc
    } = this.props;
    let rtn = {};

    rtn[name] = evt.target.value;
    controlFunc(rtn);

    this.setState({content: evt.target.value});
  }

  onFocus(evt) {
    if (typeof(this.props.onFocus) === 'function') {
      this.props.onFocus(evt);
    }
  }
  onBlur(evt) {
    if (typeof(this.props.onBlur) === 'function') {
      this.props.onBlur(evt);
    }
  }
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
  autocomplete: PropTypes.oneOf(['on', 'off']),
  dataProps: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};

SimpleInput.defaultProps = {
  iconPosition: 'left',
  iconDecorator: null,
  iconClassPrefix: 'fa',
  id: null,
  content: '',
  titleMessage: null,
  titleSeparator: ': ',
  autocomplete: 'on',
  dataProps: {}
};

export default SimpleInput;
