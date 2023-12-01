import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueriesData(['user', user]);
      navigate('/');
    },
    onError: (err) => toast.error(err.message),
  });

  return { login, isLoggingIn };
}
