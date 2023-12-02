import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // this needs to be date in ISO string so converted to it.
  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading: isRecentBookingLoading, data: bookings } = useQuery({
    queryKey: ['bookings', `last-${numDays} days`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isRecentBookingLoading, bookings };
}
