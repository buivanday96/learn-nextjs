import {  Typography } from "@mui/material"
import { green, grey } from "@mui/material/colors";
import {  Box } from "@mui/system"

function BoxTextToSpeech({txt , pselected } : {txt: string, pselected : boolean}) {

    return <div>
   <Box
    sx={{
        border: '1px solid',
        borderRadius : '5px',
        alignContent: 'center',
        backgroundColor: pselected ? green[900] : grey[50],
        padding: '16px',
        marginBottom: '16px',
    }}>
 
     <Typography sx={{
        textAlign: 'center',
        textDecoration: 'none',
        color: grey[900],
     }}>
        {txt}
     </Typography>
    </Box>
 </div>
   
}

export default BoxTextToSpeech


