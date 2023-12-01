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
    onSuccess: (data) => {
      // just like prefetching but instead of going in useUser and get
      // data for component the data is sent to cahche by RQ and getting
      // the user from cachhe instaead of going to useUser hence making
      // it little more fast (done for optimization)
      queryClient.setQueryData(['user', data.user]);
      navigate('/', { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { login, isLoggingIn };
}
