import styled from 'styled-components';

import Spinner from '../../ui/Spinner';

import SalesChart from './SalesChart';
import TodayActivity from '../check-in-out/TodayActivity';
import DurationChart from './DurationChart';
import Stats from './Stats';

import { useRecentBookings } from '../../hooks/dashboard/useRecentBookings';
import { useRecentStays } from '../../hooks/dashboard/useRecentStays';
import { useCabins } from '../../hooks/cabins/useCabins';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isRecentBookingLoading } = useRecentBookings();
  const { confiremdStays, numDays, isRecentStaysLoading } = useRecentStays();
  const { isLoading: isCabinsLoading, cabins } = useCabins();

  if (isRecentBookingLoading || isRecentStaysLoading || isCabinsLoading)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confiremdStays={confiremdStays}
        numDays={numDays}
        numCabins={cabins.length}
      />
      <TodayActivity />
      <DurationChart confiremdStays={confiremdStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
