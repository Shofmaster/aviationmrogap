import { Outlet } from 'react-router-dom';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';

export default function WebsiteLayout() {
  return (
    <div className="min-h-screen bg-gradient-navy text-white flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 pt-14 pb-8 max-w-6xl w-full">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
