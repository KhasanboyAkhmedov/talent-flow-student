import React from 'react';
import { 
  AppstoreOutlined, 
  FileTextOutlined, 
  TeamOutlined, 
  LineChartOutlined, 
  BarChartOutlined, 
  SettingOutlined,
  ThunderboltFilled
} from '@ant-design/icons';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navItems = [
    { label: 'Dashboard', icon: <AppstoreOutlined />, active: true },
    { label: 'Tests', icon: <FileTextOutlined />, active: false },
    { label: 'Candidates', icon: <TeamOutlined />, active: false },
    { label: 'AI Insights', icon: <LineChartOutlined />, active: false },
    { label: 'Analytics', icon: <BarChartOutlined />, active: false },
  ];

  return (
    /* Dynamic width: w-72 when open, w-20 when collapsed */
    <aside className={`${collapsed ? 'w-20' : 'w-72'} hidden lg:flex flex-col h-full bg-white border-r border-gray-100 shrink-0 font-sans transition-all duration-300 overflow-hidden`}>
      <div className="flex flex-col h-full p-6 justify-between">
        <div className="space-y-8">
          {/* Logo Area */}
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-2'}`}>
            <div className="bg-black flex items-center justify-center rounded-xl size-10 text-white shadow-md shrink-0">
              <ThunderboltFilled className="text-xl" />
            </div>
            {!collapsed && (
              <h1 className="text-gray-900 text-lg font-bold leading-tight tracking-tight whitespace-nowrap animate-in fade-in duration-300">
                Talent Flow Ai
              </h1>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                title={collapsed ? item.label : ''} // Tooltip when collapsed
                className={`flex items-center rounded-xl transition-all duration-200 ${collapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'} ${
                  item.active 
                    ? 'bg-black text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <span className="text-lg flex items-center shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="text-sm font-semibold whitespace-nowrap animate-in fade-in duration-300">
                    {item.label}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Footer/Settings */}
        <div className="space-y-2 pt-6 border-t border-gray-50">
          <a 
            href="#" 
            title={collapsed ? 'Settings' : ''}
            className={`flex items-center rounded-xl text-gray-500 hover:bg-gray-50 hover:text-black transition-all duration-200 ${collapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'}`}
          >
            <SettingOutlined className="text-lg shrink-0" />
            {!collapsed && <span className="text-sm font-semibold whitespace-nowrap">Settings</span>}
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;