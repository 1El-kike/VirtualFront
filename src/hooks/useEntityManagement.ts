import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../contexts/AuthContext";
import api from "../utils/api";

interface UseEntityManagementProps {
  entityName: string;
  apiEndpoint: string;
}

export const useEntityManagement = <T>({
  entityName,
  apiEndpoint,
}: UseEntityManagementProps) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // Query para obtener todas las entidades
  const { data, isLoading, error } = useQuery({
    queryKey: [entityName],
    queryFn: async () => {
      const response = await api.get(apiEndpoint);
      return response.data as T[];
    },
  });

  // Mutation para actualizar estado
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await api.put(
        `${apiEndpoint}/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityName] });
    },
  });

  // Mutation para cancelar
  const cancelMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.patch(
        `${apiEndpoint}/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [entityName] });
    },
  });

  return {
    data,
    isLoading,
    error,
    updateStatusMutation,
    cancelMutation,
  };
};
