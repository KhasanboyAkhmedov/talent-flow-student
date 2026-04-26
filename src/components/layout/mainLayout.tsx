// import React, { useState } from 'react';
// import { Layout, Menu, Button, Avatar, Dropdown, ConfigProvider } from 'antd';
// import type { MenuProps } from 'antd';
// import { 
//   MenuFoldOutlined, 
//   MenuUnfoldOutlined, 
//   UserOutlined, 
//   AppstoreOutlined, 
//   SettingOutlined,
//   LogoutOutlined,
//   ThunderboltFilled 
// } from '@ant-design/icons';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { logout } from '../../features/auth/authSlice';
// import Sidebar from './sidebar';

// const { Header, Sider, Content } = Layout;

// const MainLayout: React.FC = () => {
//   const [collapsed, setCollapsed] = useState<boolean>(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/signin');
//   };

//   const userMenuItems: MenuProps['items'] = [
//     { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
//     { type: 'divider' },
//     { key: 'logout', label: 'Logout', icon: <LogoutOutlined />, onClick: handleLogout },
//   ];

//   const sidebarMenuItems: MenuProps['items'] = [
//     { key: '/', icon: <AppstoreOutlined />, label: 'Dashboard' },
//     { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
//   ];

//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           colorPrimary: '#000000',
//           borderRadius: 8,
//           fontFamily: 'Inter, sans-serif',
//         },
//       }}
//     >
//       <Layout className="min-h-screen bg-[#FBFBFC]">
//         {/* <Sider 
//           trigger={null} 
//           collapsible 
//           collapsed={collapsed} 
//           theme="light"
//           className="border-r border-gray-100 bg-white! sticky top-0 h-screen"
//           width={280}
//         >
//           <div className="flex items-center gap-3 px-6 h-20 mb-4">
//             <div className="bg-black flex items-center justify-center rounded-xl size-10 text-white shrink-0">
//               <ThunderboltFilled className="text-xl" />
//             </div>
//             {!collapsed && (
//               <div className="animate-in fade-in duration-500">
//                 <h1 className="text-gray-900 text-base font-bold leading-none tracking-tight">RecruitAI</h1>
//                 <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Admin</p>
//               </div>
//             )}
//           </div>
          
//           <Menu
//             mode="inline"
//             selectedKeys={[location.pathname]}
//             items={sidebarMenuItems}
//             onClick={({ key }) => navigate(key)}
//             className="border-none px-2"
//           />
//         </Sider> */}
//         <Sidebar/>
//         <Layout className="bg-transparent">
//           <Header className="bg-white/80! backdrop-blur-md px-8 flex items-center justify-between border-b border-gray-100 sticky top-0 z-30 h-20">
//             <Button
//               type="text"
//               icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//               onClick={() => setCollapsed(!collapsed)}
//               className="text-gray-400 hover:text-black"
//             />
            
//             <div className="flex items-center gap-4">
//               <div className="text-right hidden sm:block">
//                 <p className="text-xs font-bold text-gray-900 leading-none mb-1">{user?.email?.split('@')[0] || 'Admin'}</p>
//                 <p className="text-[10px] text-gray-400 font-medium">Recruitment Lead</p>
//               </div>
//               <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
//                 <Avatar 
//                   className="cursor-pointer bg-gray-100 border border-gray-200" 
//                   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
//                 />
//               </Dropdown>
//             </div>
//           </Header>
          
//           <Content className="p-8 lg:p-12">
//             <div className="max-w-350 mx-auto">
//               <Outlet /> 
//             </div>
//           </Content>
//         </Layout>
//       </Layout>
//     </ConfigProvider>
//   );
// };

// export default MainLayout;

import React, { useState } from 'react';
import { Layout, Button, Avatar, Dropdown, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  UserOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import Sidebar from './sidebar';

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  // We keep the collapsed state logic in case you want to pass it to Sidebar later
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
    { type: 'divider' },
    { key: 'logout', label: 'Logout', icon: <LogoutOutlined />, onClick: handleLogout },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000000',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      {/* Flex container ensures Sidebar (aside) and Layout sit side-by-side. 
          h-screen prevents the page from growing infinitely.
      */}
      <div className="flex h-screen overflow-hidden bg-[#FBFBFC]">
        
        <Sidebar />

        <Layout className="bg-transparent flex flex-col h-full">
          {/* Header - Added backdrop blur and sticky positioning */}
          <Header className="bg-white/80! backdrop-blur-md px-8 flex items-center justify-between border-b border-gray-100 h-20 shrink-0">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-400 hover:text-black lg:hidden" // Only show on mobile if Sidebar is hidden
            />
            
            {/* Spacer for desktop since button is hidden */}
            <div className="hidden lg:block w-4" />

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-gray-900 leading-none mb-1">
                  {user?.email?.split('@')[0] || 'Admin'}
                </p>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                  Recruitment Lead
                </p>
              </div>
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                <Avatar 
                  className="cursor-pointer bg-gray-100 border border-gray-200" 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'default'}`}
                />
              </Dropdown>
            </div>
          </Header>
          
          {/* Main Content Area - Scrollable */}
          <Content className="p-8 lg:p-12 overflow-y-auto">
            <div className="max-w-350 mx-auto">
              <Outlet /> 
            </div>
          </Content>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;