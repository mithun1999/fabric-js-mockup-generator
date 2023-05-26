const canvas = new fabric.Canvas("fabric");
// canvas.setBackgroundColor("green");
canvas.setDimensions({
  width: 800,
  height: 800,
});

canvas.on("object:moving", (e) => {
  console.log("top", e.target.top);
  console.log("left", e.target.left);
});

fabric.Image.fromURL(
  "https://cdn.discordapp.com/attachments/1095753102310781008/1110167808261759037/33.png",
  (mockupImg) => {
    mockupImg?.scaleToWidth(800);
    canvas.add(mockupImg);
    fabric.Image.fromURL(
      "https://cdn.discordapp.com/attachments/1095753102310781008/1110167951849553950/sample_size.png",
      (designImg) => {
        // designImg.scaleToWidth(259.55);
        designImg.scaleToHeight(515);
        designImg.angle = 43;
        designImg.top = 185;
        designImg.left = 492;
        designImg.skewY = -10;

        // ---Controls just for testing
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
        document.getElementById("back").onchange = (e) => {
          const val = e.target.checked;
          if (val) canvas.sendBackwards(designImg);
          else canvas.sendBackwards(mockupImg);
          console.log(e.target.checked);
        };
        // End controls

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

