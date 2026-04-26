import React from 'react';
import { SearchOutlined, BellOutlined, QuestionCircleOutlined, MenuOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 px-8 py-5 bg-white shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-4 lg:hidden">
        <button className="text-gray-500 hover:text-black">
          <MenuOutlined className="text-xl" />
        </button>
      </div>

      <div className="flex w-full max-w-xl items-center">
        <div className="relative w-full group">
          <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
          <input 
            className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-black/5 transition-all outline-none" 
            placeholder="Search candidates or tests..." 
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <button className="flex items-center justify-center rounded-full size-10 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors relative">
          <BellOutlined className="text-lg" />
          <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="flex items-center justify-center rounded-full size-10 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors">
          <QuestionCircleOutlined className="text-lg" />
        </button>
      </div>
    </header>
  );
};

export default Header;