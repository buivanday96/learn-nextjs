import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostDetailProps {
}

export default function PostDetail (props: PostDetailProps) {
    
    const router = useRouter() 
  return (
    <div>
      {JSON.stringify(router.query)}
    </div>
  );
}
