import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import generateUUID from './utils/generate-uuid';

class TextArea extends PureComponent {
  constructor(props) {
    super(props);

    const {
      content,
      id,
      wrapperClasses,
      labelClasses,
      fieldClasses
    } = props;

    this.state = {
      content,
      id: id || 'input-' + generateUUID(),
      wrapperClassName: classnames('form-group', wrapperClasses),
      labelClassName: classnames('form-control-label', labelClasses),
      fieldClassName: classnames('form-control', fieldClasses)
    };

    this.updateControlFunc = this.updateControlFunc.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.fieldClasses !== prevProps.fieldClasses ||
      this.props.labelClasses !== prevProps.labelClasses ||
      this.props.wrapperClasses !== prevProps.wrapperClasses
    ) {
      this.setState( prevState => Object.assign({}, prevState, {
        ...this.props.fieldClasses !== prevProps.fieldClasses && { fieldClassName: classnames('form-control', this.props.fieldClasses) },
        ...this.props.labelClasses !== prevProps.labelClasses && { labelClassName: classnames('form-control-label', this.props.labelClasses) },
        ...this.props.wrapperClasses !== prevProps.wrapperClasses && { wrapperClassName: classnames('form-group', this.props.wrapperClasses) }
      }) );
    }
  }

  render() {
    const {
      placeholder,
      name,
      dataProps
    } = this.props;

    const {
      id,
      wrapperClassName,
      labelClassName,
      fieldClassName,
      content
    } = this.state;

    return (
      <div className={wrapperClassName}>
        <label
          htmlFor={id}
          className={labelClassName}
        >
          { this.generateTitle() }
        </label>
        <textarea
          id={id}
          className={fieldClassName}
          placeholder={placeholder}
          name={name}
          onChange={this.updateControlFunc}
          value={content}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...dataProps}
        />
      </div>
    );
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
}

TextArea.propTypes = {
  title: PropTypes.string.isRequired,
  titleSeparator: PropTypes.string,
  titleMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  name: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
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
  id: PropTypes.string,
  dataProps: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};

TextArea.defaultProps = {
  content: '',
  dataProps: {}
};

export default TextArea;
