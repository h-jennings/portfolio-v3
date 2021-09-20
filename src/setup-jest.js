import '@testing-library/jest-dom';

process.env = {
  ...process.env,
  // providing values for next `Image` component
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    domains: ['images.example.com'],
    path: '/_next/image',
    loader: 'default',
  },
};
