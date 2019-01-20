// The MIT License
//
// Copyright (c) 2019 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import * as React from 'react';
import classnames from 'classnames';
import { IMDCSnackbarAdapter, IMDCSnackbarFoundation } from './types';

// @ts-ignore no .d.ts file
import {MDCSnackbarFoundation} from '@material/snackbar';

type Props = {
  message: string,
  className?: string,
  timeoutMs?: number,
  closeOnEscape?: boolean,
  actionText?: string,
  leading?: boolean,
  stacked?: boolean,
  onBeforeOpen?: () => void,
  onOpen?: () => void,
  onBeforeClose?: (reason: string) => void,
  onClose?: (reason: string) => void,
}

type State = {
  classes: Set<string>,
  ariaLive: string,
}

export class Snackbar extends React.Component<Props, State> {
  foundation: IMDCSnackbarFoundation
  constructor(props: Props) {
    super(props);
    const { timeoutMs, closeOnEscape, leading, stacked } = this.props;
    const classes = new Set();
    if (leading)
      classes.add('mdc-snackbar--leading');
    
    if (stacked)
      classes.add('mdc-snackbar--stacked');

    this.state = {
      classes,
      ariaLive: 'polite',
    }

    this.foundation = new MDCSnackbarFoundation(this.adapter)
    if (timeoutMs)
      this.foundation.setTimeoutMs(timeoutMs);
    if (closeOnEscape)
      this.foundation.setCloseOnEscape(closeOnEscape);
  }
  get adapter(): IMDCSnackbarAdapter {
    return {
      addClass: (className: string) => {
        const { classes } = this.state;
        classes.add(className);
        this.setState({
          classes,
        });
      },
      removeClass: (className: string) => {
        const { classes } = this.state;
        classes.delete(className);
        this.setState({
          classes,
        });
      },
      announce: () => {
        this.props.onAnnounce && this.props.onAnnounce();
        console.log('TODO Snackbar/announce - have no idea what to put here');
      },
      notifyOpening: () => {
        const { onBeforeOpen } = this.props;
        if (onBeforeOpen) {
          onBeforeOpen();
        }
      },
      notifyOpened: () => {
        const { onOpen } = this.props;
        if (onOpen) {
          onOpen();
        }
      },
      notifyClosing: (reason: string) => {
        const { onBeforeClose } = this.props;
        if (onBeforeClose) {
          onBeforeClose(reason);
        }
      },
      notifyClosed: (reason: string) => {
        const { onClose } = this.props;
        if (onClose) {
          onClose(reason);
        }
      }
    }
  }
  handleActionClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.foundation.handleActionButtonClick(e.nativeEvent)
  }
  componentDidMount() {
    this.foundation.init();
    this.foundation.open();
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get classes() {
    return classnames(this.props.className, ...Array.from(this.state.classes));
  }
  render() {
    return <div className={`mdc-snackbar ${this.classes}`}>
      <div className="mdc-snackbar__surface">
        <div className="mdc-snackbar__label"
            role="status"
            aria-live={this.state.ariaLive}>
          {this.props.message}
        </div>
        {this.props.actionText ?
          <div className="mdc-snackbar__actions">
            <button type="button" onClick={this.handleActionClick} className="mdc-button mdc-snackbar__action">{this.props.actionText}</button>
          </div> : null}
      </div>
    </div>;
  }
}
