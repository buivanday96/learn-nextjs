import * as React from 'react';
import { LayoutProps } from '@/models';
import Link from 'next/link';


export interface IMainLayoutProps {
}

export function AdminLayout ({children}: LayoutProps) {
  return (
    <div>
      <h1>Admin Layout</h1>
      <div>Side bar</div>
      <Link href="/">
        Home
      </Link>

      <Link href="/about">
        About
      </Link>

      <div>{children}</div>
    </div>
  );
}
