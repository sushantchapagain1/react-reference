import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  // this needs to be date in ISO string so converted to it.
  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading: isRecentStaysLoading, data: stays } = useQuery({
    queryKey: ['stays', `last-${numDays} days`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confiremdStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
  );

  return { isRecentStaysLoading, stays, confiremdStays, numDays };
}
