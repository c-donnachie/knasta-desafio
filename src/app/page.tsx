"use client";

import { HeroUIProvider } from "@heroui/react";
import { Suspense } from "react";
import MatrixScreen from "../presentation/features/matrix/MatrixScreen";


export default function Home() {
  return (
    <HeroUIProvider>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-neutral-950">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text cursor-default select-none">
          A Peculiar Tetris Piece
        </h1>

        <Suspense fallback={<div>Cargando...</div>}>
          <MatrixScreen />
        </Suspense>


      </main>
    </HeroUIProvider>
  );
}
