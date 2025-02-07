// import { useState } from "react";
// import { QrReader } from "react-qr-reader";
 
// const QRCodeScanner = () => {
//   const [scanResult, setScanResult] = useState(null);
 
//   return (
// <div className="flex flex-col items-center p-4">
// <h2 className="text-xl font-bold mb-4">QR Code Scanner</h2>
// <div className="w-64 h-64 border rounded-lg overflow-hidden">
// <QrReader
//           constraints={{ facingMode: "environment" }}
//           onResult={(result, error) => {
//             if (result) {
//               setScanResult(result.text);

//             }
//             if (error) {
//               console.error(error)}
//           }}
//           style={{ width: "100%" }}
//         />
// </div>
//       {scanResult && (
// <p className="mt-4 text-green-600">Scanned Result: <a href={scanResult} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{scanResult}</a></p>
//       )}
// </div>
//   );
// };
 
// export default QRCodeScanner;