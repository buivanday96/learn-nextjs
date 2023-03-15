import { Box, Button, Stack, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { BeforeCapture, DragStart, DragUpdate, DropResult, ResponderProvided } from "react-beautiful-dnd";
import BoxTextToSpeech from "../Scene/BoxTextToSpeech";
import { ItemScannerCard } from "../widgets/item_scanner_card";

// Use dynamic import to load react-beautiful-dnd components
const DragDropContext = dynamic(
    () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
    { ssr: false }
);

const Droppable = dynamic(
    () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
    { ssr: false }
);

const Draggable = dynamic(
    () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
    { ssr: false }
);

const itemWidthDefault = 80
const itemHeightDefault = 80

const itemWidthDragging = 120
const itemHeightDragging = 120
    
function Speech(){

    const speech = [
        {
            id : 1,    
            text : "Welcome to Swag Soft augmented reality demo",
            isSpeech : false,
            hasHighlights : false
        },
        {
            id : 2,
            text : "The things you see are just placeholders for now. we look forward to working with you",
            isSpeech : false,
            hasHighlights : false
        },
    ]

    const cardsInit = [
        {
            id : 1,
            text : 'Card 1',
            textColor : '#000000',
            backgroundColor : '#D9D9D9',
            isSelected : false,
        },
        {
            id : 2,
            text : 'Card 2',
            textColor : '#000000',
            backgroundColor : '#BDBDBD',
            isSelected : false,
        },
        {
            id : 3,
            text : 'Card 3',
            textColor : '#000000',
            backgroundColor : '#757474',
            isSelected : false,
        },
        {
            id : 4,
            text : 'Card 4',
            textColor : '#FFFFFF',
            backgroundColor : '#434343',
            isSelected : false,
        },
    ]

    const [tts, setTts] = useState(speech)

    const [cards, setCards] = useState(cardsInit)

    const [state, setState] = useState(false)

    const [draggingId, setDraggingId] = useState('');

    const [itemSize, setItemSize] = useState(90); // initial item size

    var [curentSpeechIndex, setCurrentSpeechIndex] = useState(0); 
   
    var [curSelectedItem, setCurSelectedItem] = useState(null)

    function updateSpeech(params: {
        itemTts: any, 
        isSpeech?: boolean, 
        isHightlight?: boolean,
    }){
        const indexItemUpdate = tts.findIndex(item => item.id === params.itemTts.id)

        const updateTTS = [...tts]

        updateTTS[indexItemUpdate].isSpeech = params.isSpeech ?? updateTTS[indexItemUpdate].isSpeech

        updateTTS[indexItemUpdate].hasHighlights = params.isHightlight ?? updateTTS[indexItemUpdate].hasHighlights

        setTts(updateTTS)
    }

    function speakText(utt : SpeechSynthesisUtterance, index: number){
        utt.text = tts[index].text;

        utt.lang ="en"

        speechSynthesis.speak(utt)
    }

    const reorder = (list: any, startIndex: number, endIndex: number) : any =>{
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        if(!result.destination || result.source.index === result.destination.index){
            return
        }

        const newItems = reorder(
            cards,
            result.source.index,
            result.destination.index,
        )

        setCards(newItems)
    }

    function handleItemClick(itemId: any) { 
        // set state to old select item before.
        if(curSelectedItem){   
            updateItem(curSelectedItem, false)
        }

        if(itemId){
            setCurSelectedItem(itemId)
            updateItem(itemId, true)
        }
    };

    // Update an item by id
    const updateItem = (itemId: any, isSelected = false) => {
        // Find the item by id
        const item = cards.find(item => item.id == itemId)
        // Modify its value
        if(item){
            item.isSelected = isSelected
        }
        // Update the state with the new item
        setCards([...cards])
    }

    useEffect(() => {
        if(state){
            return
        }

        if(window['speechSynthesis'] === undefined){
            return  
        }

        const utterance = new SpeechSynthesisUtterance();
        
        speakText(utterance, curentSpeechIndex)
        
        utterance.onstart = function(evt){  
            updateSpeech({
                itemTts : tts[curentSpeechIndex],
                isSpeech: true, 
                isHightlight: true
            })
        }

        utterance.onend = function(evt){

            updateSpeech({
                itemTts: tts[curentSpeechIndex],
                isSpeech: true,
                isHightlight : false
            })

            setTimeout(()=>{
                if(curentSpeechIndex < tts.length - 1){
                
                    setCurrentSpeechIndex(curentSpeechIndex++)
                    
                    speakText(utterance, curentSpeechIndex)
    
                }
            },
            500)                    
        }
        setState(true)
    },[])

    useEffect(() => {

    }, [cards])
    
    return(
        <div>
            {
                tts.map((item: any, index: number) =>{
                    return <BoxTextToSpeech 
                        key={`${item.id}${index}`} 
                        txt={item.text} 
                        pselected = {item.hasHighlights}
                    ></BoxTextToSpeech>
                })
            }

            <Typography sx={{
                textAlign: 'center',
            }}>
                <b>Please select 1 of the following options by tapping</b>
            </Typography>

            <Box sx={{ 
                height: 180,
                display: 'flex',
                alignContent : 'center',
                alignItems : 'center',
                justifyContent : 'center',
                margin : 0,
                padding : 0,
            }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided) =>(
                            <div ref={provided.innerRef}
                            {...provided.droppableProps}>
                                <Stack 
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={4}>
                                    {
                                        cards.map((item: any, index: number) =>{
                                            return <ItemScannerCard 
                                                key={`${item.id}${index}`} 
                                                width= {itemSize}
                                                height={itemSize}
                                                id={`${item.id}`}
                                                index={index}
                                                text={item.text} 
                                                textColor={item.textColor} 
                                                backgroundColor={item.backgroundColor} 
                                                isSelected={item.isSelected}
                                                onItemCick={()=>handleItemClick(item.id)}
                                            ></ItemScannerCard>
                                        })
                                    }
                                    {provided.placeholder}
                                </Stack>                          
                            </div>        
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>

            <Box  sx={{
                 display: 'flex',
                 alignContent : 'center',
                 alignItems : 'center',
                 justifyContent : 'center',
            }}>
            <Button variant="contained" sx={{
                backgroundColor: green[800],
                background : green[800],
                '&:hover' : {
                    backgroundColor: green[800],
                },
            }}>
                <Typography>
                    Confirm
                </Typography>
            </Button>
            </Box>
        </div>
    )
}

export default Speech