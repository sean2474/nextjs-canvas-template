import { App } from "@/script/Canvas/App";
import { RefObject, useEffect, useRef, useState } from "react";

function useCanvas() {
	const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const [app, setApp] = useState<App | null>(null);
	const [mouseStatus, setMouseStatus] = useState<'down' | 'up'>('up');
	const [mousePosition, setMousePosition] = useState<{x: number, y: number}>({x: -1000, y: -1000});

  const resize = () => {
    const pixelRadio = (window.devicePixelRatio > 1) ? 2 : 1;
		
    const canvas = canvasRef.current;
    if (canvas && ctx) {
      canvas.width = document.body.clientWidth * pixelRadio;
      canvas.height = document.body.clientHeight * pixelRadio;
			app!.resize();
    }
  }

	const onDown = (e: MouseEvent) => {	
		setMouseStatus('down');
		setMousePosition({x: e.clientX*2, y: e.clientY*2});
	}

	const onMove = (e: MouseEvent) => {
		if (mouseStatus === 'down') {
			setMousePosition({x: e.clientX*2, y: e.clientY*2});
		}
	}

	const onUp = (e: MouseEvent) => {
		setMouseStatus('up');
		setMousePosition({x: -1000, y: -1000});
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
				app!.draw(mousePosition.x, mousePosition.y);
			}
			requestId = window.requestAnimationFrame(RequestAnimation(ctx));
		};
		requestId = window.requestAnimationFrame(RequestAnimation(ctx));

		return () => {
			window.cancelAnimationFrame(requestId);
		};
	});

	useEffect(() => {
		resize();
	}, [ctx]);

  useEffect(() => {
    window.addEventListener('resize', resize);
		window.addEventListener('pointerdown', onDown);
		window.addEventListener('pointermove', onMove);
		window.addEventListener('pointerup', onUp);
    return () => {
			window.removeEventListener('resize', resize);
			window.removeEventListener('pointerdown', onDown);
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerup', onUp);
		}
  });
  
  return {
		canvasRef,
	};
}

export default useCanvas;