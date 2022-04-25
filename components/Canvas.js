import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import Button from "@material-ui/core/Button";
import "react-image-crop/dist/ReactCrop.css";
import Paper from '@material-ui/core/Paper';
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
const Canvas = () => {
  const classes = useStyles();
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
  return (
    <section>
      <div className={classes.root}>
        <div className={classes.column}>
          <div className={classes.label}>
            <input type="file" name="images" onChange={onSelectFile} multiple />
          </div>
          <div className={classes.listImg}>
            <ImageList variant="scroll" cols={2} rowHeight={164}>
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
            </ImageList>
          </div>
        </div>
        <Paper className={classes.paper}>
        <div className={classes.column}>
        <div className={classes.none}>
        {selectedImg.map((e, index) => <img
         style={{zIndex: index}} src={e} className={classes.areaImage}
          />)}
          </div>
        </div>

        </Paper>
       
      </div>
    </section>
  );
};
export default Canvas;