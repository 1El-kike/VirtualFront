import { useState, useEffect } from "react";
import type { Room } from "../components/VirtualTour";

export const useVirtualTours = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener todas las habitaciones
  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/virtual-tours`
      );
      if (!response.ok) {
        throw new Error("Error al cargar las habitaciones");
      }
      const data = await response.json();
      // Prefix image URLs with backend base URL
      const roomsWithFullUrls = data.map((room: Room) => ({
        ...room,
        imageUrl: `${import.meta.env.VITE_BACKEND_URL}${room.imageUrl}`,
      }));
      setRooms(roomsWithFullUrls);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  // Función para crear una nueva habitación
  const createRoom = async (roomData: Omit<Room, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/virtual-tours`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roomData),
        }
      );
      if (!response.ok) {
        throw new Error("Error al crear la habitación");
      }
      const newRoom = await response.json();
      setRooms((prev) => [...prev, newRoom]);
      return newRoom;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar una habitación
  const updateRoom = async (
    id: number,
    roomData: Partial<Omit<Room, "id">>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/virtual-tours/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roomData),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar la habitación");
      }
      const updatedRoom = await response.json();
      setRooms((prev) =>
        prev.map((room) => (room.id === id ? updatedRoom : room))
      );
      return updatedRoom;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar una habitación
  const deleteRoom = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/virtual-tours/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar la habitación");
      }
      setRooms((prev) => prev.filter((room) => room.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar habitaciones al inicializar
  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom,
  };
};
