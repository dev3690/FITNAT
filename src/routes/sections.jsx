import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const Ex1 = lazy(() => import('src/pages/ex1'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const JordanFlex = lazy(() => import('src/pages/JordanFlex'));
export const BirdEyeView = lazy(() => import('src/pages/bird-eye-view'));

const PrivateRoute = ({ children }) => {
  const data = localStorage.getItem('data');
  return data ? children : <Navigate to="/login" replace />;
};

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <PrivateRoute><IndexPage /></PrivateRoute>, index: true },
        { path: 'user', element: <PrivateRoute><UserPage /></PrivateRoute> },
        { path: 'products', element: <PrivateRoute><ProductsPage /></PrivateRoute> },
        { path: 'blog', element: <PrivateRoute><BlogPage /></PrivateRoute> },
        { path: 'patients', element: <PrivateRoute><Ex1 /></PrivateRoute> },
        { path: 'birdeyeview', element: <PrivateRoute><BirdEyeView /></PrivateRoute> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
