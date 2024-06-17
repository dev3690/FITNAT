import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('user'),
  },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'Birds Eye View',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
 
  {
    title: 'Patients',
    path: '/ex1',
    icon: icon('patient1'),
  },
  {
    title: 'Birds Eye View', // Add new menu item
    path: '/jordanflex',
    icon: icon('eye'),
  },
  {
    title: 'logout',
    path: '/login',
    icon: icon('exit'),
  }
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
