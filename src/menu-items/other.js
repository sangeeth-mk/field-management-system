// assets
import { IconBrandChrome, IconHelp,IconUser,IconFileReport,IconCurrencyRupee,IconListCheck,IconCalendar,IconUsersGroup,IconHeadset} from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp,IconUser,IconFileReport,IconCurrencyRupee,IconListCheck,IconCalendar,IconUsersGroup,IconHeadset};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id:'task',title:'Tasks', type:'item',url:'/task-schedule',icon:IconListCheck,breadcrumbs:false
    },
    {
      id:'activity-management',title:'Activities' ,type:'item',url:'/activity',icon:icons.IconCalendar,breadcrumbs:false
    },
    
    {
      id:'expense',title:'Expense',type:'item',url:'/expense',icon:IconCurrencyRupee,breadcrumbs:false
    },
    {
      id:'support',title:'Support Enquiry',type:'item',url:'/support',icon:IconHeadset,breadcrumbs:false
    },
 
    { 
      id: 'my-team', title: 'My Team', type: 'item', url: '/my-team', icon: icons.IconUsersGroup, breadcrumbs: false
     },
     
    {
      id:'report',title:'Report',type:'item',url:'/report',icon:IconFileReport,breadcrumbs:false
    },
   
  ]
};

export default other;
