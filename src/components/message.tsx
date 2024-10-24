import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string;
  text: string;
  amountOfReactions: number;
  answered?: boolean;
  answer?: string; // Adiciona a propriedade de resposta
}

export function Message({ 
  id: messageId, 
  text, 
  amountOfReactions, 
  answered = false,
  answer,
}: MessageProps) {
  const { roomId } = useParams();
  const [hasReacted, setHasReacted] = useState(false);

  async function createMessageReactionAction() {
    if (!roomId) {
      return;
    }

    try {
      await createMessageReaction({ messageId, roomId });
    } catch {
      toast.error('Falha ao reagir mensagem, tente novamente!');
    }

    setHasReacted(true);
  }

  async function removeMessageReactionAction() {
    if (!roomId) {
      return;
    }

    try {
      await removeMessageReaction({ messageId, roomId });
    } catch {
      toast.error('Falha ao remover reação, tente novamente!');
    }

    setHasReacted(false);
  }

  return (
    <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-800 dark:text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
      {text}

      {hasReacted ? (
        <button 
          type="button" 
          onClick={removeMessageReactionAction} 
          className="mt-3 flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button 
          type="button" 
          onClick={createMessageReactionAction} 
          className="mt-3 flex items-center gap-2 text-zinc-500 text-sm font-medium hover:text-zinc-400"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}

      {/* Exibir resposta, se disponível */}
      {answer && (
        <div className="mt-4 pl-4 border-l-4 border-emerald-400 text-zinc-700 dark:text-zinc-300">
          <p className="text-sm font-medium">Resposta:</p>
          <p>{answer}</p>
        </div>
      )}
    </li>
  );
}
