import React from 'react';
import GiftApp from '../components/GiftApp/GiftApp';
import TopNavbar from '@/components/TopNavbar';
import Footer from '@/components/Footer';
import BrandNavbarSection from '@/components/productsPages/BrandNavbarSection';
import MainNavbarProduct from '@/components/productsPages/MainNavbarProduct';
import MainNavbar from '@/components/MainNavbar';

const GiftUniversePage = () => {
  return (
    <div className="min-h-screen">
      <TopNavbar />
        <BrandNavbarSection />
        <div className="hidden lg:block">
          <MainNavbar />
        </div>
      <GiftApp />
      <Footer />
    </div>
  );
};

export default GiftUniversePage;