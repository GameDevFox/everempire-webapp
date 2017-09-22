import React from 'react';

import { mount } from 'enzyme';
import sinon from 'sinon';

import OAuthSignInButton from './oauth-signin-button';

describe('OAuthSignInButton', () => {
  it('should have proper classes and call onClick function', () => {
    const spy = sinon.spy();
    const oAuthButton = mount(<OAuthSignInButton provider="test" onClick={spy}/>);

    const button = oAuthButton.find('button');
    button.hasClass('btn-test').should.be.true();
    button.find('.fa').hasClass('fa-test').should.be.true();
    button.text().should.equal('Sign in with Test');

    button.simulate('click');
    spy.called.should.be.true();
  });
});
