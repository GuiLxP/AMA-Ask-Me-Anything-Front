interface UpdateMessageWithAnswerRequest {
  roomId: string;
  messageId: string;
  answer: string;
}

export async function updateMessageWithAnswer({ roomId, messageId, answer }: UpdateMessageWithAnswerRequest) {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}/messages/${messageId}/answer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answer,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar a resposta.');
  }

  const data = await response.json();
  return data;
}
