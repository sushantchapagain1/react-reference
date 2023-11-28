import React from 'react';
import CabinRow from './CabinRow';

import Spinner from '../../ui/Spinner';
import useCabins from '../../hooks/cabins/useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  const [searchParams] = useSearchParams();

  // Filtering
  const filteredValue = searchParams.get('discount') || 'all';

  let filteredCabins;

  if (filteredValue === 'all') {
    filteredCabins = cabins;
  }
  if (filteredValue === 'no-discount') {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  }
  if (filteredValue === 'with-discount') {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  // Sorting
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price </div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
