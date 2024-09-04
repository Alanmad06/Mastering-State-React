import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { setupStore } from '../redux/store';

// Esta función renderiza el componente con los proveedores necesarios.
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Crear una instancia de la store automáticamente si no se pasó una
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
