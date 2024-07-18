// src/tests/components-tests/Subscribe.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {store} from '../../redux/store';
import {Subscribe} from '../../components/Subscribe';

const emailMock = 'email@gmail.com';
const emailMockError = 'forbidden@email.com'

describe('<Subscribe/>', () => {

  

  beforeEach(()=>{
    render(
      <Provider store={store}>
        <Subscribe />
      </Provider>
    );
  })

  test('One input should be on screen', () => {
    
    expect(screen.getByRole('subscribe')).toBeInTheDocument()
    
  });

  test('Mock Api Error')
});

