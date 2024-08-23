import { Suspense } from "react";
import { Navbar } from "../components/navbar";
import { RoomCards } from "../components/room-cards";
export function Rooms() {

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-white dark:bg-zinc-950 flex min-h-screen px-6 py-6">
        <Suspense fallback={<p>Carregando...</p>}>
          <RoomCards />
        </Suspense>
      </main>
    </>
  )
}