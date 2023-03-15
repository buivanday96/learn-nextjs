import Speech from "@/components/layout/speech";
import { Box, NoSsr } from "@mui/material";
import { red } from "@mui/material/colors";
import dynamic from "next/dynamic";

const Scanner = () => {
    // vars
    // funtion
    // state

    const NoSsrMyNFTScene = dynamic(
        () => import('../components/Scene/MyNFTScene'),
        {
            ssr: false,
        }
    )
    
    // view html
    return (
        <NoSsr>
            <div style={{
                alignItems: 'center',
                justifyContent: 'center',    
            }}>
                <NoSsrMyNFTScene></NoSsrMyNFTScene>
                <Box sx={{
                    width: '100vw',
                    height: '100vh',
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',    
                    position: 'absolute',
                }}>
                    <Speech></Speech>
                </Box>
                
                <Box sx={{
                     margin: 'auto',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',    
                     position: 'absolute',
                }}>
                    <Box sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: red
                    }}>
                        
                    </Box>

                </Box>
            </div>
        </NoSsr>
    );
}

export default Scanner;