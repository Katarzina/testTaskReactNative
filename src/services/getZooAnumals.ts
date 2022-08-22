import fetch from './fetch';

export default () =>
  fetch({
    path: '/animals/rand/10',
  });
