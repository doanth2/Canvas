import React, { useState, useRef, } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import useImage from "use-image";
import Konva from "konva";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "20px",
    "@media screen and (max-width: 767px)": {
      display: "block"
    }
  },
  column: {
    zIndex:"1",
    flexBasis: "30%",
    padding: "12px 16px",

    "@media screen and (max-width: 767px)": {
      margin: "0 auto"
    }
  },
  areaImage:{
   position:"absolute",
     width:"100px",
     height:"100px",
     zIndex:1,
    objectPosition:"center"
  },
  input: {
    display: "flex",
    margin: "0 0 35px 50px",
    padding: "7px",
    cursor: "pointer",
    fontSize: "0.8rem",
    justifyContent: "center",
    borderRadius: "5px",
    "& button": {
      minWidth: "10%"
    },
    "@media screen and (max-width: 767px)": {
      display: "flex",
      margin: "0 auto",
      marginBottom: "15px"
    }
  },
  listImg: {
    backgroundColor: "#ECEEF1",
    width: "270px",
    height: "500px",
    overflow: "scroll",
    "@media screen and (max-width: 767px)": {
      display: "flex",
      margin: "0 auto",
      marginBottom: "15px"
    }
  },
  img: {
    width: "100px",
    height: "100px",
    padding: "3px",
    cursor: "pointer",
    margin: "5px",
    "&:hover": { backgroundColor: "#2275D2", color: "#fff" },
    "@media screen and (max-width: 767px)": {
      width: "90%",
      width: "90%",
      padding: "1px"
    }
  },
  form: {
    padding: "8px 0",
    display: "flex",
    "@media screen and (max-width: 767px)": {
      padding: "8px",
      marginBottom: "10px"
    }
  },
  formLabel: {
    minWidth: "90px"
  },
  formInput: {
    flex: "1"
  },
  removeButton: {
    padding: "0 1px 0 1px",
    backgroundColor: "#FFFFFF"
  },
  selected: {
    border: "4px solid #ff4081",
    width: "300px",
    height: "300px",
    "@media screen and (max-width: 767px)": {
      display: "flex",
      width: "60%",
      height: "60%",
      marginRight: "90px"
    }
  },
  buttonCrop: {
    margin: "10px 170px",
    borderRadius: "5px",
    "@media screen and (max-width: 767px)": {
      display: "flex",
      margin: "0 auto",
      marginTop: "30px"
    }
  },
  dropImg: {
    backgroundColor: "#ECEEF1",
    width: "470px",
    border: "0 solid none",
    padding: "65px",
    display: "flex",
    justifyContent: "center"
  },
  result: {
    margin: "75px 80px",
    "@media screen and (max-width: 767px)": {
      display: "flex",
      marginTop: "10px",
      justifyContent: "center"
    }
  },
  paper:{
    backgroundColor:"#ff4081",
    zIndex:"-1"
  },
  none:{
    width:"200px"
  }
}));
const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const [image] = useImage(
    "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg",
    "Anonimus"
  );
  const shapeRef = useRef();
  const trRef = useRef();

  React.useLayoutEffect(() => {
    shapeRef.current.cache();
  }, [image]);

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Image
        image={image}
        onClick={onSelect}
        ref={shapeRef}
        filters={[Konva.Filters.Blur]}
        blurRadius={10}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY()
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
    scaleX: 1,
    scaleY: 1,
    id: "rect1"
  }
];

const Canvas2 = () => {
  const classes = useStyles();
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, selectShape] = useState(null);
  const [selectedImg, setSelectedImg] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const onSelectFile = (e) => {
    if (e.target.files) {
      const imagesArray = [...e.target.files].map((file) => {
        return URL.createObjectURL(file);
      });
      setSelectedImages((prevImages) => prevImages.concat(imagesArray));
    }
  };
  return (<section>
    <div className={classes.listImg}>
    <input type="file" name="images" onChange={onSelectFile} multiple />
      <div>
        {selectedImages &&
          selectedImages.map((img, index) => {
            return (
              <div key={index}>
                <img
                  src={img}
                  alt="img"
                  className={classes.img}
                  onClick={() => setSelectedImg([...selectedImg, img])}
                />
              </div>
            );
          })}
      </div>
      </div>
      <div className={classes.column}>
          {selectedImg.map(e => <img src={e} className={classes.selected} />)}
        </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(e) => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            selectShape(null);
          }
        }}
      >
        <Layer>
        <div className={classes.column}>
          {selectedImg.map(e => <img src={e} className={classes.selected} />)}
        </div>
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
export default Canvas2

