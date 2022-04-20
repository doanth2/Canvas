import React, {useState } from 'react';
import { Stage, Layer, Text } from 'react-konva'

const DragDrop = () => {
   const [dragDrop, setDragDrop] = useState({
      isDragging: false,
      x: 50,
      y: 50,
   })
   return (
      <div>
         <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
               <Text
                  text="Draggable Text"
                  x={dragDrop.x}
                  y={dragDrop.y}
                  draggable
                  fill={dragDrop.isDragging ? 'green' : 'black'}
                  onDragStart={() => {
                     setDragDrop({
                        isDragging: true,
                     });
                  }}
                  onDragEnd={(e) => {
                     setDragDrop({
                        isDragging: false,
                        x: e.target.x(),
                        y: e.target.y(),
                     });
                  }}
               />
            </Layer>
         </Stage>
      </div>
   )
}
export default DragDrop