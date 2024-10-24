import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { updateMessageWithAnswer } from '../http/update-message-with-answer'; // Função de atualização da mensagem com a resposta

export function AdminAnswerPage() {
  const { roomId, messageId } = useParams<{ roomId: string, messageId: string }>();
  const [answer, setAnswer] = useState("");

  if (!roomId || !messageId) {
    throw new Error('Room ID e Message ID são obrigatórios');
  }

  async function handleAnswerSubmit() {
    try {
      await updateMessageWithAnswer({ roomId: roomId!, messageId: messageId!, answer });
      toast.success('Resposta enviada com sucesso!');
    } catch (error) {
      toast.error('Falha ao enviar a resposta, tente novamente!');
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Responder Mensagem</h1>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full mt-4 p-2 border rounded"
        placeholder="Digite sua resposta aqui..."
      />
      <button
        onClick={handleAnswerSubmit}
        className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded"
      >
        Enviar Resposta
      </button>
    </div>
  );
}
