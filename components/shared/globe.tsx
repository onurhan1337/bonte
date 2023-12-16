import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import useMediaQuery from "../../hooks/use-media-query";

export default function Globe() {
  const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const { isMobile, isTablet } = useMediaQuery();

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 1,
      width: canvasRef.current!.clientWidth, // adjust this
      height: canvasRef.current!.clientHeight,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [39.9334, 32.8597], size: 0.2 },
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [51.5074, 0.1278], size: 0.1 },
        { location: [35.6762, 139.6503], size: 0.1 },
        { location: [55.7558, 37.6173], size: 0.1 },
        { location: [52.52, 13.405], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.004;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [isMobile, isTablet]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "16/9",
        }}
      />
    </div>
  );
}
