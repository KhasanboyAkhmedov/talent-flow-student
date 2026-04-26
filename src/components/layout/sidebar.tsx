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

const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', icon: <AppstoreOutlined />, active: true },
    { label: 'Tests', icon: <FileTextOutlined />, active: false },
    { label: 'Candidates', icon: <TeamOutlined />, active: false },
    { label: 'AI Insights', icon: <LineChartOutlined />, active: false },
    { label: 'Analytics', icon: <BarChartOutlined />, active: false },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 h-full bg-white border-r border-gray-100 shrink-0 font-sans">
      <div className="flex flex-col h-full p-6 justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-black flex items-center justify-center rounded-xl size-10 text-white shadow-md">
              <ThunderboltFilled className="text-xl" />
            </div>
            <div>
              <h1 className="text-gray-900 text-lg font-bold leading-tight tracking-tight">RecruitAI</h1>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">Admin Console</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  item.active 
                    ? 'bg-black text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <span className="text-lg flex items-center">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-2 pt-6 border-t border-gray-50">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-black transition-all duration-200">
            <SettingOutlined className="text-lg" />
            <span className="text-sm font-semibold">Settings</span>
          </a>
          <div className="flex items-center gap-3 px-4 py-2 mt-2">
            <div className="size-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="avatar" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-gray-900 text-sm font-bold truncate leading-none mb-1">Alex Morgan</p>
              <p className="text-gray-400 text-[11px] truncate">alex@recruitai.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;