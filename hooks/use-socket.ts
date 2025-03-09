import React, { useEffect } from "react"
import { io } from "socket.io-client"

export const useSocket = (socketKey: string) => {
  const [data, setData] = React.useState<any>({})
  
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL)
    const handleData = (newData: any) => {
      setData(newData);
    };

    socket.on("connect", () => {
      console.log("Connected to websocket")
    })
    socket.on(socketKey, handleData);
    socket.on("disconnect", () => {
      console.log("Disconnected from websocket")
    })

    return () => {
      socket.off(socketKey, handleData);
      socket.disconnect()
    }
  }, [socketKey])

  return {
    socketData: data,
  }
}