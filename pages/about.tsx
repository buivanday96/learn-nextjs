import { MainLayout } from '@/components/layout';
import * as React from 'react';

export interface AboutProps {
}

 const AboutPage  = (props: AboutProps)=> {
  return (
    <div>
      <h1>About </h1>
    </div>
  );
}

AboutPage.Layout = MainLayout

export default AboutPage