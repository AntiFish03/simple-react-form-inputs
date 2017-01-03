import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

class Button extends Component {
  constructor(props) {
    super(props);

    const {
      wrapperClasses,
      fieldClasses,
      typeClass
    } = props;

    this.state = {
      wrapperClassName: cx('form-group', wrapperClasses),
      fieldClassName: cx('btn', typeClass, fieldClasses)
    };
  }

  render() {
    const {
      wrapperClassName,
      fieldClassName
    } = this.state;

    const {
      type
    } = this.props;

    return (
      <div className={wrapperClassName}>
        <button
          className={fieldClassName}
          type={type}
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
  typeClass: PropTypes.string,
  type: PropTypes.string
};

Button.defaultProps = {
  typeClass: 'btn-primary',
  type: null
};

export default Button;
