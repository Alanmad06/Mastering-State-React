// src/tests/components-tests/Subscribe.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {store} from '../../redux/store';
import {Subscribe} from '../../components/Subscribe';

describe('<Subscribe/>', () => {
  test('Renderizado componente Subscribe', () => {
    render(
      <Provider store={store}>
        <Subscribe />
      </Provider>
    );
    const titleElement = screen.getByText(/Join Our Program/i);
    expect(titleElement).toBeInTheDocument();
  });
});

