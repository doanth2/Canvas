import React,{useRef,useEffect} from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import UploadImage from "./UploadImage";
import Konva from "konva";
import useImage from "use-image";

const ICON =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDI2LjY2NyA0MjYuNjY3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MjYuNjY3IDQyNi42Njc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjEzLjMzMyw4NS4zMzNWMEwxMDYuNjY3LDEwNi42NjdsMTA2LjY2NywxMDYuNjY3VjEyOGM3MC43MiwwLDEyOCw1Ny4yOCwxMjgsMTI4cy01Ny4yOCwxMjgtMTI4LDEyOHMtMTI4LTU3LjI4LTEyOC0xMjgNCgkJCUg0Mi42NjdjMCw5NC4yOTMsNzYuMzczLDE3MC42NjcsMTcwLjY2NywxNzAuNjY3UzM4NCwzNTAuMjkzLDM4NCwyNTZTMzA3LjYyNyw4NS4zMzMsMjEzLjMzMyw4NS4zMzN6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=";
const TurnImage = () => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [icon] = useImage(ICON);

   useEffect(() => {
    if (!icon) {
      return;
    }

    const tr = trRef.current;
    tr.nodes([shapeRef.current]);

    var rot = tr.findOne(".rotater");

    // generate rotater background
    const iconCanvas = document.createElement("canvas");
    iconCanvas.width = rot.width();
    iconCanvas.height = rot.height();

    const ctx = iconCanvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, iconCanvas.width, iconCanvas.height);
    ctx.drawImage(icon, 0, 0, iconCanvas.width, iconCanvas.height);

    tr.update = function () {
      Konva.Transformer.prototype.update.call(tr);
      var rot = this.findOne(".rotater");
      // disaable fill
      rot.fill(null);
      // enable icon
      rot.fillPatternImage(iconCanvas);
    };
    tr.update();
    tr.getLayer().draw();
  }, [icon]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={50}
          y={70}
          fill="grey"
          width={100}
          height={100}
          ref={shapeRef}
        />
        <Transformer ref={trRef} />
      </Layer>
    </Stage>
  );
};

export default TurnImage
