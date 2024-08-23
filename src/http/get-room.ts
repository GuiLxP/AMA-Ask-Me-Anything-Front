
export interface GetRoomResponse {
  roomId: string;
  theme: string;
}

interface GetRoomRequest {
  roomId: string;
}
export async function getRoom({ roomId }: GetRoomRequest): Promise<GetRoomResponse> {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms/${roomId}`);

  if (!response.ok) {
    throw new Error(`Error fetching room: ${response.statusText}`);
  }

  const data: {
    id: string;
    theme: string;
  } = await response.json();

  return {
    roomId: data.id,
    theme: data.theme,
  };
}
