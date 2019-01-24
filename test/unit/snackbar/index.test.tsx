import * as React from 'react';
import * as td from 'testdouble';
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

test('opening notification works', () => {
  const openingHandler = td.func<() => void>();
  const wrapper = shallow<Snackbar>(<Snackbar open={false} onOpening={openingHandler} message='example' actionText='action' />);
  wrapper.instance().foundation.adapter_.notifyOpening()
  td.verify(openingHandler(), {times: 1});
});

test('open notification works', () => {
  const openHandler = td.func<() => void>();
  const wrapper = shallow<Snackbar>(<Snackbar open={false} onOpen={openHandler} message='example' actionText='action' />);
  wrapper.instance().foundation.adapter_.notifyOpened()
  td.verify(openHandler(), {times: 1});
});

test('closing notification works', () => {
  const closingHandler = td.func<(reason: string) => void>();
  const wrapper = shallow<Snackbar>(<Snackbar open={false} onClosing={closingHandler} message='example' actionText='action' />);
  wrapper.instance().foundation.adapter_.notifyClosing('unit_test')
  td.verify(closingHandler('unit_test'), {times: 1});
});

test('close notification works', () => {
  const closeHandler = td.func<(reason: string) => void>();
  const wrapper = shallow<Snackbar>(<Snackbar open={false} onClose={closeHandler} message='example' actionText='action' />);
  wrapper.instance().foundation.adapter_.notifyClosed('unit_test')
  td.verify(closeHandler('unit_test'), {times: 1});
});
