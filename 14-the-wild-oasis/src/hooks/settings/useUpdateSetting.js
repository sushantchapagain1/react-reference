import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSetting as updateSettingApi } from '../../services/apiSettings';

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isEditing } = useMutation({
    mutationKey: ['edit-settings'],
    mutationFn: updateSettingApi,

    onSuccess: () => {
      toast.success('Settings updated successfully!');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateSetting, isEditing };
}

export default useUpdateSettings;
