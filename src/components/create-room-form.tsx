import { useNavigate } from "react-router-dom";
import { createRoom } from "../http/create-room";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export function CreateRoomForm() {
  const navigate = useNavigate()

  async function handleCreateRoom(data: FormData) {
    const theme = data.get('theme')?.toString()

    if (!theme) {
      return
    }

    try {
      const { roomId } = await createRoom({ theme })

      navigate(`/room/${roomId}`)
    } catch {
      toast.error('Falha ao criar sala!')
    }
  }
  return (
    <form
      action={handleCreateRoom}
      className="flex items-center gap-2 dark:bg-white p-2 rounded-xl border border-zinc-300 dark:border-zinc-800 dark:ring-zinc-400 ring-slate-400 ring-offset-2 dark:ring-offset-zinc-950 focus-within:ring-1"
    >
      <input
        type="text"
        name="theme"
        placeholder="Nome da sala"
        autoComplete="off"
        className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-900 dark:text-black placeholder:text-zinc-600 dark:placeholder:text-zinc-400"
        required
      />

      <button
        type="submit"
        className="bg-black text-white px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-slate-600"
      >
        Criar sala
        <ArrowRight className="size-4" />
      </button>
    </form>
  )
}