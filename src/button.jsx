import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Button extends PureComponent {
  constructor(props) {
    super(props);

    const {
      wrapperClasses,
      fieldClasses,
      typeClass
    } = props;

    this.state = {
      wrapperClassName: classnames('form-group', wrapperClasses),
      fieldClassName: classnames('btn', typeClass, fieldClasses)
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.fieldClasses !== prevProps.fieldClasses ||
      this.props.wrapperClasses !== prevProps.wrapperClasses
    ) {
      this.setState( prevState => Object.assign({}, prevState, {
        ...this.props.fieldClasses !== prevProps.fieldClasses && { fieldClassName: classnames('form-control', this.props.fieldClasses) },
        ...this.props.wrapperClasses !== prevProps.wrapperClasses && { wrapperClassName: classnames('form-group', this.props.wrapperClasses) }
      }) );
    }
  }

  render() {
    const {
      wrapperClassName,
      fieldClassName
    } = this.state;

    const {
      type,
      controlFunc,
      id,
      dataProps
    } = this.props;

    return (
      <div className={wrapperClassName}>
        <button
          className={fieldClassName}
          type={type}
          onClick={controlFunc}
          id={id}
          {...dataProps}
        >
        { this.generateLabel() }
        </button>
      </div>
    );
  }

  generateLabel() {
    const {
      label
    } = this.props;

    if (typeof label === 'string') {
      return (<span className="buttonContent">{label}</span>);
    }

    return (label);
  }
}

Button.propTypes = {
  wrapperClasses: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]),
  fieldClasses: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  controlFunc: PropTypes.func,
  typeClass: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  dataProps: PropTypes.object
};

Button.defaultProps = {
  typeClass: 'btn-primary',
  type: null,
  controlFunc: function () {},
  id: null,
  dataProps: {}
};

export default Button;
