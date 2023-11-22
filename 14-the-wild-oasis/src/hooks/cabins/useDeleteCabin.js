import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin } from '../../services/apiCabins';

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationKey: ['delete-cabin'],
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      toast.success('cabin deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isDeleting };
}

export default useDeleteCabin;
