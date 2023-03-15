import React,{useEffect} from 'react';
import { LayoutProps } from '@/models';
import Link from 'next/link';

export function MainLayout ({children}: LayoutProps) {

  useEffect(() => {
    console.log('Main Layout mouting')
    return ()=> console.log("MainLayout unmounting")
  }, [])
  return (
    <div>
      <h1>Main Layout</h1>
      <Link href="/" >
        Home
      </Link>

      <Link href="/about" >
       About
      </Link>

      <Link href="/introduce" >
       Introduce
      </Link>

      <div>{children}</div>
    </div>
  );
}
