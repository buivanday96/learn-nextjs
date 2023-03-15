
import * as React from 'react';
import { Image } from 'mui-image';
import { Box } from '@mui/material';


export interface IntroduceProps {
}

const Introduce = () => {
  return (
    <div>
      <Box>
        <Image
          src='/ss_icon.png'
          width="80vw"
          height="80vw"
        />
      </Box>

    </div>
  );
}

export default Introduce