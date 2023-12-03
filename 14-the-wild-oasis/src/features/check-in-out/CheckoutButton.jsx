import Button from '../../ui/Button';

import { useCheckOut } from '../../hooks/check-in-out/useCheckOut';

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkOut(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
