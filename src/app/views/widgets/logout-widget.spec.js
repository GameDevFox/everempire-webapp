import React from 'react';

import { mount } from 'enzyme';
import 'should';
import sinon from 'sinon';

import bind from '../../utils/class-bind';
import LogoutWidget from './logout-widget';

describe('LogoutWidget', () => {
  it('should call signOut() on click', () => {
    const spy = sinon.spy();
    const TestLogoutWidget = bind(LogoutWidget, { channelService: { signOut: spy } });

    const logoutWidget = mount(<TestLogoutWidget/>);
    logoutWidget.find('a').simulate('click');

    spy.called.should.be.true();
  });
});
