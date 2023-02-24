import '@testing-library/jest-dom';
import { beforeAll } from 'vitest';

(global as any).CSS = { supports: () => false };

beforeAll(() => {
  global.CSS = {
    supports: () => false,
    escape: (str: string) => str,
  };
});

class ResizeObserverStub {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

if (typeof window !== 'undefined') {
  window.ResizeObserver = window.ResizeObserver || ResizeObserverStub;
}
