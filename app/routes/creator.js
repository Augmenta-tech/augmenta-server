import Route from '@ember/routing/route';

export default class CreatorRoute extends Route {
  model() {
    return {
      test: 'cool',
      number: 0.5,
      arr: ['Marie Curie', 'Mae Jemison', 'Albert Hofmann'],
    };
  }
}
