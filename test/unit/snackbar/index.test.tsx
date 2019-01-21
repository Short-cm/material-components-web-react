import * as React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import {Snackbar} from '../../../packages/snackbar/index';

suite('Snackbar');

test('classNames adds classes', () => {
  const wrapper = shallow(<Snackbar className='test-class-name' message='example' />);
  assert.isTrue(wrapper.hasClass('test-class-name'));
  assert.isTrue(wrapper.hasClass('mdc-snackbar'));
});

test('does not render actions block if no actions sent', () => {
  const wrapper = shallow(<Snackbar message='example' />);
  assert.equal(wrapper.find('.mdc-snackbar__actions').length, 0);
});

test('renders actions', () => {
  const wrapper = shallow(<Snackbar message='example' actionText='action' />);
  assert.equal(wrapper.find('.mdc-snackbar__actions').length, 1);
  assert.equal(wrapper.find('.mdc-snackbar__action').length, 1);
});

test('renders leading actions', () => {
  const wrapper = shallow(<Snackbar leading={true} message='example' actionText='action' />);
  assert.isTrue(wrapper.hasClass('mdc-snackbar'));
  assert.isTrue(wrapper.hasClass('mdc-snackbar--leading'));
});

test('renders stacked actions', () => {
  const wrapper = shallow(<Snackbar stacked={true} message='example' actionText='action' />);
  assert.isTrue(wrapper.hasClass('mdc-snackbar'));
  assert.isTrue(wrapper.hasClass('mdc-snackbar--stacked'));
});
