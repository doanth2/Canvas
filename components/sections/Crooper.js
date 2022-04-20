// // import React from 'react';
// // import { createRoot } from 'react-dom/client';
// // import { Stage, Layer, Star, Text } from 'react-konva';

// // const Crooper = () => {
// //   return(
// //      <div>
// //              <Stage width={window.innerWidth} height={window.innerHeight}>
              
// //              </Stage>
// //              <div>Lookingfffffffffffff</div>
// //      </div>
// //   )
// // };
// // export default Crooper


// import React, { useState } from 'react';
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// // import { createRoot } from "react-dom/client";
// // import { Stage, Layer, Image } from "react-konva";
// // import useImage from "use-image";
// const useStyles = makeStyles((theme) => ({

//    img: {
//       width: "100px",
//       height: "50px",
//       padding: "5px"
//    }
// }));

// const UploadImage = ({ listImage, setListImage, setSelectedImage }) => {
//    const classes = useStyles();
//    const [selectedFiles, setSelectedFiles] = useState([]);

//    const handleImageChange = (e) => {
//       // console.log(e.target.files[])
//       if (e.target.files) {
//          const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

//          console.log("filesArray: ", filesArray);

//          setSelectedFiles((prevImages) => prevImages.concat(filesArray));
//          Array.from(e.target.files).map(
//             (file) => URL.revokeObjectURL(file) // avoid memory leak
//          );
//       }
//    };

//    const renderPhotos = (source) => {

//       return source.map((photo) => {
//          return <img className={classes.img}

//             src={photo} alt="" key={photo} />;
//       });
//    };

//    return (
//       <section className={classes.root}>
//          <Grid container spacing={2}>
//             <Grid item xs={12} className={classes.cardContent}>
//                <div className={classes.app}>
//                   <div className={classes.heading}>Choose Image</div>
//                   <div>
//                      <input type="file" id="file" multiple onChange={handleImageChange} />
//                      <div className={classes.labelHolder}>
//                         <label htmlFor="file" className={classes.label}>
//                            <i className={classes.icons}>Add Image</i>
//                         </label>
//                      </div>
//                      <div className={classes.reasult}>{renderPhotos(selectedFiles)}</div>
//                   </div>
//                </div>
//             </Grid>
//          </Grid>
//       </section>
//    );
// };

// export default UploadImage;