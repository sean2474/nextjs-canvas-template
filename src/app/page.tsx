"use client";

import styles from './page.module.css'
import useCanvas from "@/hooks/Canvas/useCanvas";

export default function Home() {
  const { canvasRef } = useCanvas();

  return (
    <canvas className={styles.canvas} id="canvas" ref={canvasRef}></canvas>
  )
}
