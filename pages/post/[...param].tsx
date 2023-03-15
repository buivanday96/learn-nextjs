import { useRouter } from 'next/router';
import * as React from 'react';

export interface IParamDetailProps {
}

export default function ParamDetail (props: IParamDetailProps) {

    const router = useRouter()
  return (
    <div>
      {JSON.stringify(router.query)}
    </div>
  );
}
