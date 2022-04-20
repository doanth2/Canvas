import React,{useRef,useState, useEffect} from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
   img: {
      width: "100px",
      height: "90px",
      padding: "5px"
   },

   images: {
      display: "flex",
      flexDireaction: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center"
   },
   picture: {
      maxWidth: "calc(100% - 100px)",
   },
   stage: {
      maxWidth: "calc(100% - 100px"
   },
   layer: {
      maxWidth: "30px"
   }
}));

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();
//   const dragUrl = useRef();
//   const stageRef = useRef();
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect1',
  },
//   {
//     x: 150,
//     y: 150,
//     width: 100,
//     height: 100,
//     fill: 'green',
//     id: 'rect2',
//   },
];

const Tranfer = () => {
   const classes = useStyles();
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, selectShape] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  const [selectedImages, setSelectedImages] = useState([]);
  const onSelectFile = (event) => {
     const selectedFiles = event.target.files;
     const selectedFilesArray = Array.from(selectedFiles);

     const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
     });
     setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  return (
   <section>
       <label className='label'>
               <input
                  className='input'
                  type="file"
                  name="images"
                  onChange={onSelectFile}
                  multiple
                  accept="image/png , image/jpeg, image/webp"
               />
            </label>
            <div>
            </div>
            <div className={classes.images}>
               {selectedImages &&
                  selectedImages.map((image, index) => {
                     return (
                        <div key={index} className="image">
                           <img
                              className={classes.img}
                              src={image} height="200" alt="upload"
                              draggable="true"
                              onDragStart={(e) => {
                                 dragUrl.current = e.target.src;
                              }}
                           />

                        </div>
                     );
                  })}
            </div>
       <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}
      </Layer>
    </Stage>
   </section>
  );
};
export default Tranfer