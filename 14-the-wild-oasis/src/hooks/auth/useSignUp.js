import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { signup as signUpApi } from '../../services/apiAuth';

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationKey: ['signup'],
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify your account from the user's email address"
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { signUp, isLoading };
}
