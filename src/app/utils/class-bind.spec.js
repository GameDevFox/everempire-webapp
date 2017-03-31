import React, {Component} from 'react';

import {renderToElement} from '../test/react-utils';

import bind from './class-bind';

describe('class bind', () => {
  it('should bind dependacies to class which will be available on all instances', () => {
    let bindings = null;

    class TestComponent extends Component {
      render() {
        const {alpha, beta, delta, omega, extra} = this;
        bindings = {alpha, beta, delta, omega, extra};
        return <div>Test</div>;
      }
    }

    const TestComponentB = bind(TestComponent, {alpha: 'first', beta: 'second'});
    const TestComponentC = bind(TestComponentB, {beta: 'another', delta: 'one', omega: 'final'});
    renderToElement(<TestComponentC omega={'name'} extra={'gold'}/>);

    // alpha should come from B class
    // beta and delta should come from C class
    // omega and extra should from from instance
    bindings.should.eql({alpha: 'first', beta: 'another', delta: 'one', omega: 'name', extra: 'gold'});
  });
});
