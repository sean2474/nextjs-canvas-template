import { App } from "@/script/Canvas/App";
import { RefObject, useEffect, useRef, useState } from "react";

function useCanvas() {
	const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const [app, setApp] = useState<App | null>(null);

  const resize = () => {
    const pixelRadio = (window.devicePixelRatio > 1) ? 2 : 1;
    const canvas = canvasRef.current;
    if (canvas && ctx) {
      canvas.width = document.body.clientWidth * pixelRadio;
      canvas.height = document.body.clientHeight * pixelRadio;
			app!.resize();
    }
  }
	useEffect(() => {
		if (canvasRef?.current) {
			const canvas = canvasRef.current;
			const context = canvas.getContext("2d");
			setCtx(context);
			setApp(new App(context!, canvas));
		}
	}, []);

	useEffect(() => {
		let requestId: number;
		const RequestAnimation = (ctx: CanvasRenderingContext2D | null) => () => {
			const canvas = canvasRef.current;
			if (ctx) {
				ctx.clearRect(0, 0, canvas!.width, canvas!.height);
				app?.draw();
			}
			requestId = window.requestAnimationFrame(RequestAnimation(ctx));
		};
		requestId = window.requestAnimationFrame(RequestAnimation(ctx));

		return () => {
			window.cancelAnimationFrame(requestId);
		};
	});

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize();
    return () => window.removeEventListener('resize', resize);
  });
  
  return {
		canvasRef,
	};
}

export default useCanvas;