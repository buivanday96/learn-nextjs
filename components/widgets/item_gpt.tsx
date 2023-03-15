import React from "react";
import dynamic from "next/dynamic";
import { OnDragEndResponder } from "react-beautiful-dnd";

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

// A mock data array of items
const items = [
{ id: "item-1", content: "Item 1" },
{ id: "item-2", content: "Item 2" },
{ id: "item-3", content: "Item 3" },
];

// A function to reorder the items array after dragging
const reorder: any = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

// A custom component to render each item
const Item = (item: any, index: number ) => {
    return (
        <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                    userSelect: "none",
                    padding: 16,
                    margin: `0 ${8}px`,
                    // minHeight: "50px",
                    background: snapshot.isDragging ? "lightgreen" : "grey",
                    ...provided.draggableProps.style,
                }}
                >
                {item.content}
            </div>
        )}
        </Draggable>
    );
};

// The main component that renders the list
const HorizontalList = () => {

// Use state to store the items array
const [stateItems, setStateItems] = React.useState(items);

// A function to handle the end of dragging event
const onDragEnd = (result: OnDragEndResponder | any) => {
    // If the destination is null or same as source, do nothing
    if (!result.destination || result.source.index === result.destination.index) {
        return;
    }

    // Otherwise, reorder the items array and update the state
    const newItems = reorder(
        stateItems,    
        result.source.index,
        result.destination.index
    );

    setStateItems(newItems);
};

return (
<DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable" direction="horizontal">
    {(provided) => (
        <div
            ref={provided.innerRef}
            style={{
            display: "flex",
            overflowX: "auto",
            padding:`${8}px`,
            width:`${300}px`,
            border:`1px solid #ccc`,
            borderRadius:`${4}px`
            }}
            {...provided.droppableProps}
            >
            {stateItems.map((item, index) => (
                <Item key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
        </div>
    )}
    </Droppable>
</DragDropContext>
);
};

export default HorizontalList;