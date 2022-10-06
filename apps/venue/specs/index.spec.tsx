import React from 'react';
import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import Index from '../pages/index';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SessionProvider>
        <Index />
      </SessionProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
