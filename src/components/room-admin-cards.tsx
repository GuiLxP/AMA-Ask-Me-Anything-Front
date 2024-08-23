import { useSuspenseQuery } from "@tanstack/react-query";
import { getRooms } from "../http/get-rooms";
import { ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getRoom } from "../http/get-room";
import { deleteRoom } from "../http/delete-room";

export function RoomAdminCards() {
  const navigate = useNavigate();

  const { data } = useSuspenseQuery({
    queryKey: ['rooms'],
    queryFn: () => getRooms(),
  });

  async function handleGetRoom(roomId: string, theme: string) {
    if (!roomId) {
      toast.error('ID da sala não encontrado!');
      return;
    }

    try {
      await getRoom({ roomId, theme });
      navigate(`/room/${roomId}`);
    } catch {
      toast.error('Erro ao entrar na sala!');
    }
  }

  async function handleDeleteRoom(roomId: string) {
    if (!roomId) {
      toast.error('ID da sala não encontrado!');
      return;
    }

    const confirmed = window.confirm('Tem certeza que deseja apagar esta sala? Esta ação não pode ser desfeita.');

    if (!confirmed) {
      return;
    }

    try {
      await deleteRoom({ roomId });
      toast.success('Sala apagada com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 7000)
    } catch (error: any) {
      toast.error(`Erro ao apagar a sala: ${error.message}`);
    }
  }

  return (
    <div className="h-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-auto">
      {data.rooms.map(room => (
        <div
          key={room.roomId}
          className="relative light:border-2 border-slate-300 bg-stone-200 dark:hover:shadow-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow ease-in flex flex-col items-start"
        >
          <button onClick={() => handleDeleteRoom(room.roomId)}>
            <X className="absolute top-0 right-0 mt-2 mr-2 dark:text-white text-black rounded-full w-6 h-6 flex items-center justify-center" />
          </button>

          <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {room.theme}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            <b>Código da sala:</b> <span className="dark:text-white">{room.roomId}</span>
          </p>
          <button
            onClick={() => handleGetRoom(room.roomId, room.theme)}
            className="h-8 bg-black text-white px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-slate-600"
          >
            Entrar
            <ArrowRight className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
