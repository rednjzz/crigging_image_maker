// import CraneModule from "./CraneModule";
//
// export default async function (parts) {
//   const drawParts = await parts.map((data) => {
//     const ctx = canvasRef.current.getContext('2d');
//     const mod = new CraneModule(
//       data.x1,
//       data.y1,
//       data.x2,
//       data.y2,
//       wX,
//       wY,
//       offSetX,
//       offSetY,
//       data.angle,
//       canvasWidth,
//       canvasHeight,
//       data.imgSrc,
//       data.drawOrder,
//       ctx);
//
//     // mod.draw();
//     // mod.drawPoints();
//     wX = mod.nextCoordX;
//     wY = mod.nextCoordY;
//     return mod;
//   })
// }