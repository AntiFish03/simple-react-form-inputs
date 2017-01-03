/* globals module */
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { action } from '@kadira/storybook-addon-actions';

import { SimpleInput, Select, MultiSelect, TextArea, Button } from '../src';

import 'style-loader!css-loader!less-loader!bootstrap/less/bootstrap.less';
import 'style-loader!css-loader!less-loader!font-awesome/less/font-awesome.less';
import 'style-loader!css-loader!../src/css/input-icons.css';

const errors = ['cannot be blank'];
const selectOptions = [
  {label: 'Texas', value: 'TX'},
  {label: 'Tennessee', value: 'TN'}
];
const flatOptions = [
  'Car', 'Truck', 'Van', 'Exotic', 'Custom'
];

const ccOptions = [
  {label: 'Visa', value: 'visa'},
  {label: 'MasterCard', value: 'mc'},
  {label: 'Discover', value: 'disc'}
];

const multiselectOptions = [
  {label: 'Mustard', value: 'must'},
  {label: 'Ketchup', value: 'ket'},
  {label: 'Pickles', value: 'pic'},
  {label: 'Onions', value: 'ons'},
  {label: 'Jalepenos', value: 'jal'}
];

storiesOf('Simple Input', module)
  .addWithInfo('default',
    `Simple Input returns the data as an object ({<name>: <value>}) making it easy to
      properly handle with a unified handler just set the name in the props to
      the parent components prop/state. Example:

      render() {
        return (
          <form>
            <SimpleInput
              name="search"
              content={this.state.search}
              controlFunc={this.handleField}
              ...
            />
          </form>
        );
      },
      handleField(data) {
        // data = {search: value}
        this.setState(data);
      }
    `,
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <SimpleInput
            inputType="text"
            title="Input 1"
            name="input-name"
            controlFunc={action('change')}
            content=""
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with an icon class decorator - left',
    'To add a decorator simply add a string value that matches an icon',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <SimpleInput
            inputType="text"
            title="Search"
            name="search"
            controlFunc={action('change')}
            content=""
            iconDecorator="fa-search"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with an icon class decorator - right',
    'To add a decorator simply add a string value that matches an icon',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <SimpleInput
            inputType="text"
            title="Search"
            name="search"
            controlFunc={action('change')}
            content=""
            iconDecorator="fa-search"
            iconPosition="right"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with an icon node - left',
    'To add a decorator simply add a string value that matches an icon',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <SimpleInput
            inputType="text"
            title="Search"
            name="search"
            controlFunc={action('change')}
            content=""
            iconDecorator={(<i className="fa fa-search" />)}
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with an icon node - right',
    'To add a decorator simply add a string value that matches an icon',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <SimpleInput
            inputType="text"
            title="Search"
            name="search"
            controlFunc={action('change')}
            content=""
            iconDecorator={(<i className="fa fa-search" />)}
            iconPosition="right"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('works with glyphicons too!',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <SimpleInput
            inputType="text"
            title="Search"
            name="search"
            controlFunc={action('change')}
            content=""
            iconDecorator="glyphicon-search"
            iconClassPrefix="glyphicon"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('placeholder',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <SimpleInput
            inputType="text"
            title="Search"
            name="search"
            controlFunc={action('change')}
            content=""
            placeholder="Enter search terms or product #"
            iconDecorator="fa-search"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with additional title message - node',
    `Allows React Nodes to be added to the title message for hinting or
      validation messages.
    `,
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <SimpleInput
            inputType="text"
            title="Phone Number"
            titleMessage={(<small>(xxx)-xxx-xxxx</small>)}
            name="input-name"
            controlFunc={action('change')}
            content=""
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with additional title message - string',
    `Allows Strings to be concatenated with the title and title separator for
      hinting or validation messages.
    `,
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <SimpleInput
            inputType="text"
            title="State"
            titleMessage="US and Canada only"
            name="input-name"
            controlFunc={action('change')}
            content=""
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('pass additional classes for wrapper, field, and label',
    'Has many uses... such as; validation',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <SimpleInput
            inputType="text"
            title="Input 1"
            titleMessage={errors[0]}
            name="input-name"
            controlFunc={action('change')}
            content=""
            wrapperClasses={'has-error'}
            labelClasses={['control-label']}
            fieldClasses={{error: (errors.length > 0)}}
          />
          <SimpleInput
            inputType="text"
            title="Input 2"
            name="input-name2"
            controlFunc={action('change')}
            content=""
            wrapperClasses={'has-warning'}
            labelClasses={['control-label']}
            fieldClasses={{warning: true}}
          />
          <SimpleInput
            inputType="text"
            title="Input 3"
            name="input-name3"
            controlFunc={action('change')}
            content="abcd"
            wrapperClasses={'has-success'}
            labelClasses={['control-label']}
            iconDecorator={(<i className="fa fa-check" style={{color: '#3c763d'}} />)}
            iconPosition="right"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('override generated id',
    `Sometimes you really need a specific html id.  There is no detection for
      inproper characters in this field
    `,
    () =>(
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <SimpleInput
            inputType="text"
            title="Input 1"
            name="input-name"
            controlFunc={action('change')}
            content=""
            id="hello-world"
          />
        </div>
      </div>
    ),
    {inline: true}
  );

storiesOf('Select', module)
  .addWithInfo('default',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <Select
            name="state"
            options={selectOptions}
            controlFunc={action('change')}
            title="State"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with placeholder',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <Select
            name="state"
            options={selectOptions}
            controlFunc={action('change')}
            title="State"
            placeholder="Select One"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('using flat array options',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <Select
            name="vehicleType"
            options={flatOptions}
            controlFunc={action('change')}
            title="What is your vehicle type"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with icon decorators - left',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <Select
            name="ccType"
            options={ccOptions}
            controlFunc={action('change')}
            title="Credit Card Type"
            iconDecorator="fa-credit-card"
            placeholder="Select One"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with icon decorators - right',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <Select
            name="vehicleType"
            options={flatOptions}
            controlFunc={action('change')}
            title="What is your vehicle type"
            titleMessage="is required"
            iconDecorator="fa-remove"
            iconPosition="right"
            placeholder="Select One"
            wrapperClasses="has-error"
            labelClasses={['control-label']}
          />
        </div>
      </div>
    ),
    {inline: true}
  );

storiesOf('Multi Select', module)
  .addWithInfo('default',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <MultiSelect
            title="Add condiments to your burger"
            options={multiselectOptions}
            controlFunc={action('click')}
            name="condiments"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with selected options',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <MultiSelect
            title="Add condiments to your burger"
            options={multiselectOptions}
            controlFunc={action('click')}
            name="condiments"
            selectedOptions={['must', 'ket', 'ons']}
          />
        </div>
      </div>
    ),
    {inline: true}
  );

storiesOf('TextArea', module)
  .addWithInfo('default',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <TextArea
            title="Comments"
            controlFunc={action('change')}
            content=""
            name="comments"
          />
        </div>
      </div>
    )
    , {inline: true}
  );

storiesOf('Button', module)
  .addWithInfo('default',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <Button
            label="Submit"
            type="submit"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with additional field classes',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <Button
            label="Submit"
            type="submit"
            fieldClasses={['btn-block']}
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with different type class',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <Button
            label="Submit"
            type="submit"
            typeClass="btn-danger"
          />
        </div>
      </div>
    ),
    {inline: true}
  );
