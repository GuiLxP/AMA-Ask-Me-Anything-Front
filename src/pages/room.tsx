import { useParams } from "react-router-dom";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

import logoDiflen from '../assets/logo.png';
import { Messages } from "../components/messages";
import { Suspense } from "react";
import { CreateMessageForm } from "../components/create-message-form";
import { Navbar } from "../components/navbar";

export function Room() {
  const { roomId } = useParams();

  function handleShareRoom() {
    const url = window.location.href.toString();

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url });
    } else {
      navigator.clipboard.writeText(url);
      toast.info('O link da sala foi copiado para área de transferência!');
    }
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <h1 className="px-20 py-4 text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
        <p className="text-red-600">Sala: desisto por hoje </p>
      </h1>
      <main className="dark:bg-zinc-950 bg-white">
        <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
          <div className="flex items-center gap-3 px-3">
            <img src={logoDiflen} alt="logo Diflen" className="h-10 w-10" />
            <span className="text-sm text-zinc-500 truncate">
              Código da sala: <span className="text-black dark:text-zinc-300">{roomId}</span>
            </span>
            <button
              type="submit"
              onClick={handleShareRoom}
              className="bg-black text-white px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-slate-600"
            >
              Compartilhar
              <Share2 className="size-4" />
            </button>
          </div>
          <div className="h-px w-full bg-zinc-900" />
          <CreateMessageForm />
          <Suspense fallback={<p>Carregando...</p>}>
            <Messages />
          </Suspense>
        </div>
      </main>
    </>
  );
}
