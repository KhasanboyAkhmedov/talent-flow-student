import React from 'react';
import {
  BellOutlined, 
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { Avatar, Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import type { User } from '../../features/auth/authSlice';

interface HeaderProps {
  user: User | null;
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, collapsed, onToggle, onLogout }) => {
  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
    { type: 'divider' },
    { key: 'logout', label: 'Logout', icon: <LogoutOutlined />, onClick: onLogout },
  ];

  return (
    <header className="flex items-center justify-between border-b border-gray-100 px-8 h-20 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="text-gray-400 hover:text-black lg:hidden"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center rounded-full size-10 text-gray-400 hover:bg-gray-100 hover:text-black transition-colors relative">
            <BellOutlined className="text-lg" />
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-gray-100" />

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            {/* Displaying actual user name and role from Redux state */}
            <p className="text-xs font-bold text-gray-900 leading-none mb-1">
              {user ? `${user.name} ${user.surname}` : 'Admin'}
            </p>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              {user?.userRole || 'Recruitment Lead'}
            </p>
          </div>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
            <Avatar 
              className="cursor-pointer bg-gray-100 border border-gray-200 shadow-sm" 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'default'}`}
            />
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;