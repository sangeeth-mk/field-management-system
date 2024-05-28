import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// import Customise from 'views/customise'
     
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
 
 

// Myteam routing
const MyTeam=Loadable(lazy(()=>import('views/my-team')))

//Activity menu routing


const Activitymanagement=Loadable(lazy(()=>import('views/activity-management')))


//Task scheduling routing

const TaskScheduling=Loadable(lazy(()=>import('views/task')))

//Expense page routing

const Expense=Loadable(lazy(()=>import('views/expense')))

//report routing

const Report=Loadable(lazy(()=>import('views/report')))


//support routing
const Support = Loadable(lazy(()=>import('views/support')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
     
    
    {
      path:'my-team',
      element:<MyTeam/>
    },
    {
      path:'activity',
      element:<Activitymanagement/>
    },
    {
      path:'task-schedule',
      element:<TaskScheduling/>
    },
    {
      path:'expense',
      element:<Expense/>
    },
    {
      path:'support',
      element:<Support/>
    },
    {
      path:'report',
      element:<Report/>
    },
   
  ]
};

export default MainRoutes;
