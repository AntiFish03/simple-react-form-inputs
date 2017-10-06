/* globals module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SimpleInput, Select, MultiSelect, TextArea, Button, AutoComplete } from '../src';

import 'bootstrap/less/bootstrap.less';
import 'font-awesome/less/font-awesome.less';
import '../src/css/input-icons.css';
import '../src/css/auto-complete.css';

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

const autoCompleteOptions = [
  {
    title: 'Dallas, TX',
    category: 'city'
  }, {
    title: 'DAL - Love Field, Dallas, TX',
    category: 'airport'
  }, {
    title: 'DBO - Dubbo, Dubbo, AU',
    category: 'airport'
  }, {
    title: 'DBQ - Dubuque Municipal Airport, Dubuque, IA',
    category: 'airport'
  }, {
    title: 'DCA - Washington National Airport, Washington, DC',
    category: 'airport'
  }, {
    title: 'DCF - Cane Field, Dominica, DM',
    category: 'airport'
  }, {
    title: 'DDC - Dodge City Municipal, Dodge City, KS',
    category: 'airport'
  }, {
    title: 'Denver, CO',
    category: 'city'
  }, {
    title: 'DEN - Denver International, Denver, CO',
    category: 'airport'
  }, {
    title: 'DFW - Dallas Ft Worth International, Dallas/Ft Worth, TX',
    category: 'airport'
  }, {
    title: 'DGA - Dangriga, Dangriga, BZ',
    category: 'airport'
  }, {
    title: 'DGO - Gen Guadalupe Victoria, Durango, MX',
    category: 'airport'
  }, {
    title: 'Dhahran, SA',
    category: 'city'
  }, {
    title: 'Dhaka, BD',
    category: 'city'
  }, {
    title: 'Diamond Bar, CA',
    category: 'city'
  }, {
    title: 'Dickinson, TX',
    category: 'city'
  }, {
    title: 'Djerba Midoun, TN',
    category: 'city'
  }, {
    title: 'Djerba, TN',
    category: 'city'
  }, {
    title: 'DKR - Yoff, Dakar, SN',
    category: 'airport'
  }, {
    title: 'Dlephi, GR',
    category: 'city'
  }, {
    title: 'DLA - Douala, Douala, CM',
    category: 'airport'
  }, {
    title: 'DME - Domodedovo, Moscow, RU',
    category: 'airport'
  }, {
    title: 'Dnepropetrovsk, UA',
    category: 'city'
  }, {
    title: 'Dnipro, UA',
    category: 'city'
  }, {
    title: 'Downers Grove, IL',
    category: 'city'
  }, {
    title: 'Docklands, GB',
    category: 'city'
  }, {
    title: 'DPL - Dipolog, Dipolog, PH',
    category: 'airport'
  }, {
    title: 'DPO - Devonport, Devonport, AU',
    category: 'airport'
  }, {
    title: 'Draveil, FR',
    category: 'city'
  }, {
    title: 'Dragor De, DK',
    category: 'city'
  }, {
    title: 'DTW - Detroit Metropolitan Airport, Detroit, MI',
    category: 'airport'
  }, {
    title: 'Dt Tilburg Netherlan, NL',
    category: 'city'
  }, {
    title: 'Dubai, AE',
    category: 'city'
  }, {
    title: 'Dublin, CA',
    category: 'city'
  }, {
    title: 'DVO - Mati, Davao, PH',
    category: 'airport'
  }, {
    title: 'Dwarka, IN',
    category: 'city'
  }, {
    title: 'Dwight, IL',
    category: 'city'
  }, {
    title: 'DXB - Dubai International Airport, Dubai, AE',
    category: 'airport'
  }, {
    title: 'Dyce Aberdeen, GB',
    category: 'city'
  }, {
    title: 'Dyersburg, TN',
    category: 'city'
  }
];

const otherAutoCompleteOptions = [
  {
    title: 'Queen',
    category: 'queen'
  },
  {
    title: 'Pawn',
    category: 'pawn'
  },
  {
    title: 'Knight',
    category: 'knight'
  },
  {
    title: 'Bishop',
    category: 'bishop'
  }
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
  )
  .addWithInfo('additional data props',
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
            dataProps={ {
              'data-position': 'top'
            } }
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
  )
  .addWithInfo('additional data props',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <Select
            name="state"
            options={selectOptions}
            controlFunc={action('change')}
            title="State"
            dataProps={ {
              'data-position': 'top'
            } }
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
  )
  .addWithInfo('with additional data props',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <TextArea
            title="Comments"
            controlFunc={action('change')}
            content=""
            name="comments"
            dataProps={{'data-position': 'top'}}
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
            controlFunc={action('click')}
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
            controlFunc={action('click')}
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
  )
  .addWithInfo('with custom id',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <Button
            label="Submit"
            type="submit"
            typeClass="btn-danger"
            id="customId"
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with additional data props',
    '',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <Button
            label="Submit"
            type="submit"
            dataProps={{'data-position': 'top'}}
          />
        </div>
      </div>
    ),
    {inline: true}
  );

storiesOf('Auto Complete', module)
  .addWithInfo('default',
    'This does not include a suggestion engine only the DOM implementation',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <AutoComplete
            inputType="text"
            title="Input 1"
            name="input-name"
            controlFunc={action('change')}
            content=""
            suggestions={[]}
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with suggestions',
    'This does not include a suggestion engine only the DOM implementation',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <AutoComplete
            inputType="text"
            title="Input 1"
            name="input-name"
            controlFunc={action('change')}
            content=""
            suggestions={autoCompleteOptions}
          />
        </div>
      </div>
    ),
    {inline: true}
  )
  .addWithInfo('with custom category icon mapping',
    'This does not include a suggestion engine only the DOM implementation',
    () => (
      <div className="container">
        <div className="col-xs-12 col-md-4">
          <AutoComplete
            inputType="text"
            title="Input 1"
            name="input-name"
            controlFunc={action('change')}
            content=""
            suggestions={otherAutoCompleteOptions}
            categoryIconMapping={{
              knight: 'glyphicon-knight',
              queen: 'glyphicon-queen',
              bishop: 'glyphicon-bishop'
            }}
            defaultSuggestionIcon="glyphicon-pawn"
            iconClassPrefix="glyphicon"
          />
        </div>
      </div>
    ),
    {inline: true}
  );
