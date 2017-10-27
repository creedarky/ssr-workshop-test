import HomeView from 'views/HomeView.jsx';
import CounterView from 'views/CounterView.jsx';

const routes = [
  {
    component: HomeView,
    path: '/',
    exact: true
  },
  {
    component: CounterView,
    path: '/counter',
    exact: true
  }
];

export default routes;
