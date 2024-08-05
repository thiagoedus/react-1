// import { rest } from 'msw';
// const { setupServer } = require('msw/node');

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';

// const handlers = [
//   rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
//     return res(
//       ctx.json([
//         {
//           userId: 1,
//           id: 1,
//           title: 'title1',
//           body: 'body1',
//           url: 'img1.jpg',
//         },
//         {
//           userId: 2,
//           id: 2,
//           title: 'title2',
//           body: 'body2',
//           url: 'img1.jpg',
//         },
//         {
//           userId: 3,
//           id: 3,
//           title: 'title3',
//           body: 'body3',
//           url: 'img3.jpg',
//         },
//       ]),
//     );
//   }),
// ];

// const server = setupServer(...handlers);

describe('<Home />', () => {
  // beforeAll(() => {
  //   server.listen();
  // });

  // afterEach(() => server.resetHandlers());

  // afterAll(() => {
  //   server.close();
  // });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    // expect.assertions(2);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(10);

    const button = screen.getByRole('button', { name: /Load More/i });

    expect(button).toBeInTheDocument();
  });
});
