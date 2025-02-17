import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Skeleton() {
  const [error, setError] = useState(false);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px]">
    <DotLottieReact
      width={160}
      height={160}
      src="https://lottie.host/ed2e7166-7a25-4ba0-8158-cef668278255/HzxAaROPYm.lottie"
      loop
      autoplay
    />
  </div>

  );
}




