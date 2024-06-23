import dynamic from 'next/dynamic'
import { authCheck } from '@/helper/authChecker';
import { redirect } from 'next/navigation';
import React from 'react';
// import HomeComp from '@/components/HomeComp';


const HomeComp = dynamic(() => import('@/components/HomeComp'), { ssr: false })


const HomePage = async () => {
  const auth = await authCheck('token');
  if(!auth){
    redirect("/login")
  }
  return (<HomeComp />);
};

export default HomePage;