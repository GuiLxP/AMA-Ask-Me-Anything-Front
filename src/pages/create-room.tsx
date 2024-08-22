import logoDiflen from '../assets/logo.png'
import Navbar from '../components/navbar'
import { CreateRoomForm } from '../components/create-room-form'

export function CreateRoom() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-white dark:bg-black h-screen flex items-center justify-center px-4">
        <div className="max-w-[450px] flex flex-col gap-6">
          <div className="flex items-center justify-center">
            <img src={logoDiflen} alt="AMA" className="w-16 h-16 " />
          </div>

          <p className="leading-relaxed text-zinc-900 dark:text-zinc-300 text-center">
            Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.
          </p>
          <CreateRoomForm />
        </div>
      </main>
    </>

  )
}