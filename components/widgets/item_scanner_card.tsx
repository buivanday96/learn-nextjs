import { Box, Typography } from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
import dynamic from 'next/dynamic';
import * as React from 'react';

import { DraggingStyle,DraggableProvided, DraggableStateSnapshot, NotDraggingStyle } from 'react-beautiful-dnd'

const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable),
    { ssr: false }
);

export interface ItemScannerCardProps {
    id: string;
    width: number;
    height: number;
    text: string;
    isSelected?: boolean | undefined;
    backgroundColor? : string;
    textColor? : string;
    index: number;
    onItemCick(itemId: any): void,
}

export function ItemScannerCard (props: ItemScannerCardProps,) {

  // const [isDragging, setIsDragging] = React.useState(false)

  const tm = ( provided : DraggableProvided , snapshot: DraggableStateSnapshot): any=>{
    // setIsDragging(snapshot.isDragging)

    let style = provided.draggableProps.style

    if(snapshot.isDragging){
      const draggingStyle: DraggingStyle = {
        position: 'fixed',
        top: ((provided.draggableProps.style) as DraggingStyle).top,
        left: ((provided.draggableProps.style) as DraggingStyle).left,
        boxSizing: 'border-box',
        width: 120,
        height: 120,
        transition: provided.draggableProps.style?.transition ?? 'none',
        transform:  provided.draggableProps.style?.transform,
        zIndex: 5000,
        opacity: undefined,
        pointerEvents: 'none',
      };

      style = draggingStyle
    }else{
      const noDraggStyle: NotDraggingStyle = {
        transition:  'none',
        transform:  provided.draggableProps.style?.transform,
      } 

      style = noDraggStyle
    }  
        return (
            <Box onClick={props.onItemCick}
           
            ref={provided.innerRef}
              {...provided.draggableProps}
              
            style={{
                width: `${props.width}px`,
                height: `${props.height}px`,
                ...style,
              }}

              sx={{
                display: "flex",
                borderRadius : '8px',
                borderColor: props.isSelected? red[900] : props.backgroundColor ,
                borderWidth: 'thick',
                borderStyle: 'solid',
                backgroundColor : props.isSelected ? 
                                    blue[200] : (props.backgroundColor ?? '#ffffff'),
                alignContent : 'center', 
                alignItems : 'center',
                justifyContent : 'center',
              }}
               >
                <Box {...provided.dragHandleProps} sx={{
                  padding: '16px',
                }}>
                  <Typography sx={{
                      color: props.textColor ?? '#ffffff',
                      textAlign : 'center',
                      alignContents: 'center',
                      alignItems: 'center',
                      justifyContent : 'center',
                  }}>
                      {props.text}
                  </Typography>
                </Box>
            </Box> 
        )
  } 

  return (

    <div>
      <Draggable draggableId={props.id} index={props.index} >  
      { 
        (provided, snapshot)=> tm(provided, snapshot)
      }
    </Draggable>
    </div>
    
  );
}
