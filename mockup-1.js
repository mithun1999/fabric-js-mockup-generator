const canvas = new fabric.Canvas("fabric");
canvas.setBackgroundColor("green");
canvas.setDimensions({
  width: 800,
  height: 800,
});

canvas.on("object:moving", (e) => {
  console.log("top", e.target.top);
  console.log("left", e.target.left);
});

canvas.on("object:scaling", (e) => {
  canvas.getActiveObjects().forEach((o) => {
    const height = o.scaleY ? o.height * o.scaleY : o.height;
    const width = o.scaleX ? o.width * o.scaleX : o.height;
    console.log("width", width);
    console.log("height", height);
  });
});

fabric.Image.fromURL(
  "https://cdn.discordapp.com/attachments/1095753102310781008/1110491312702103562/44.png",
  (mockupImg) => {
    mockupImg?.scaleToWidth(800);
    canvas.add(mockupImg);
    fabric.Image.fromURL(
      "https://cdn.discordapp.com/attachments/1095753102310781008/1110167951849553950/sample_size.png",
      (designImg) => {
        // designImg.scaleToWidth(232);
        // designImg.scaleToHeight(550);
        designImg.set({
          scaleX: 187 / designImg.width,
          scaleY: 495 / designImg.height,
        });
        designImg.setCoords();

        // designImg.width = 232;
        // designImg.height = 550;
        designImg.top = 29;
        designImg.left = 411;
        designImg.angle = 37;
        designImg.skewY = -20;
        document.getElementById("skewx").onchange = (e) => {
          console.log("skewX", e.target.value);
          designImg.skewX = e.target.value;
          designImg.setCoords();
          canvas.add(designImg);
        };
        document.getElementById("skewy").onchange = (e) => {
          console.log("skewY", e.target.value);
          designImg.skewY = e.target.value;
          designImg.setCoords();
          canvas.add(designImg);
        };
        document.getElementById("angle").onchange = (e) => {
          console.log("angle", e.target.value);
          designImg.angle = e.target.value;
          designImg.setCoords();
          canvas.add(designImg);
        };
        canvas.add(designImg);
        document.getElementById("back").onchange = (e) => {
          const val = e.target.checked;
          if (val) canvas.sendBackwards(designImg);
          else canvas.sendBackwards(mockupImg);
          designImg.setCoords();
        };
        canvas.sendBackwards(designImg);
        canvas.renderAll();

        const downloadEle = document.getElementById("download");
        const imageData = canvas.toDataURL("image/png");
        const imageBlob = dataURLToBlob(imageData);
        const url = URL.createObjectURL(imageBlob);
        downloadEle.href = url;
      },
      { crossOrigin: "Anonymous" }
    );
  },
  { crossOrigin: "Anonymous" }
);
