import Home from 'views/Home/index.jsx';
import Counter from 'views/Counter/index.jsx';

const routes = [
  {
    component: Home,
    path: '/',
    exact: true
  },
  {
    component: Counter,
    path: '/counter',
    exact: true
  }
];

export default routes;
