import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import generateUUID from './utils/generate-uuid';

class TextArea extends Component {
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
    const {
      name,
      controlFunc
    } = this.props;
    let rtn = {};

    rtn[name] = evt.target.value;
    controlFunc(rtn);

    this.setState({content: evt.target.value});
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
  dataProps: PropTypes.object
};

TextArea.defaultProps = {
  content: '',
  dataProps: {}
};

export default TextArea;
