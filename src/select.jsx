import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import generateUUID from './utils/generate-uuid';

class Select extends Component {
  constructor(props) {
    super(props);

    const {
      name,
      selectedOption,
      fieldClasses,
      labelClasses,
      wrapperClasses,
      id
    } = props;

    this.state = {
      name,
      selectedOption,
      id: id || 'input-' + generateUUID(),
      fieldClassName: classnames('form-control', fieldClasses),
      labelClassName: classnames('form-control-label', labelClasses),
      wrapperClassName: classnames('form-group', wrapperClasses)
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
        {this.generateField()}
      </div>
    );
  }

  updateControlFunc(evt) {
    const {
      name,
      controlFunc
    } = this.props;
    let rtn = {};

    rtn[name] = evt.target.value;
    controlFunc(rtn);

    this.setState({selectedOption: evt.target.value});
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

  generateField() {
    const {
      id,
      selectedOption,
      fieldClassName
    } = this.state;

    const {
      name,
      options,
      iconDecorator,
      iconPosition,
      iconClassPrefix,
      dataProps
    } = this.props;

    const field = (<select
      id={id}
      name={name}
      value={selectedOption}
      onChange={this.updateControlFunc}
      className={fieldClassName}
      {...dataProps}
      >
      { this.placeholder() }
      {options.map(function (opt) {
        let value = typeof(opt.value) !== 'undefined' ? opt.value : opt;
        let label = typeof(opt.label) !== 'undefined' ? opt.label : opt;
        return (
          <option
            key={value}
            value={value}
          >
            {label}
          </option>
        );
      })}
    </select>);
    const containerClasses = [
      'input-icon',
      'icon-' + iconPosition,
      'select-wrapper',
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
  placeholder() {
    const {
      placeholder,
      placeholderValue
    } = this.props;

    if (placeholder) {
      return (
        <option
          value={(placeholderValue)}
        >
          {placeholder}
        </option>
      );
    }
  }
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  controlFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  placeholderValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  title: PropTypes.string.isRequired,
  titleSeparator: PropTypes.string,
  titleMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
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
  iconPosition: PropTypes.oneOf([
    'left',
    'right'
  ]),
  iconDecorator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  iconClassPrefix: PropTypes.string,
  dataProps: PropTypes.object
};

Select.defaultProps = {
  titleSeparator: ': ',
  placeholderValue: '',
  iconPosition: 'left',
  iconDecorator: null,
  iconClassPrefix: 'fa',
  dataProps: {}
};

export default Select;
