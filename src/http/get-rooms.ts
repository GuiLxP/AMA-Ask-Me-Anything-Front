export interface GetRoomsResponse {
  rooms: {
    roomId: string;
    theme: string;
  }[]
}

export async function getRooms(): Promise<GetRoomsResponse> {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/rooms`)

  const data: Array<{ 
    id: string
    theme: string
  }> = await response.json()

  return {
    rooms: data.map(item => {
      return {
        roomId: item.id,
        theme: item.theme
      }
    })
  }
}
