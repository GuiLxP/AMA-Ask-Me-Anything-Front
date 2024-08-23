interface DeleteRoomRequest {
  roomId: string;
}

export interface DeleteRoomResponse {
  roomId: string;
  theme: string;
}

export async function deleteRoom({ roomId }: DeleteRoomRequest): Promise<DeleteRoomResponse | null> {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Erro ao apagar a sala: ${response.statusText}`);
  }

  const isJsonResponse = response.headers.get('Content-Type')?.includes('application/json');
  
  if (response.status !== 204 && isJsonResponse) {
    const data: {
      id: string;
      theme: string;
    } = await response.json();

    return {
      roomId: data.id,
      theme: data.theme,
    };
  }

  return null;
}
