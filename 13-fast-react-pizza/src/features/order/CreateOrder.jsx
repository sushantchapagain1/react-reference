import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress } from '../user/userSlice';
import { clearCart, getCart, getTotalPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const cart = useSelector(getCart);
  const cartTotalPrice = useSelector(getTotalPrice);
  const dispatch = useDispatch();
  const priorityPrice = withPriority ? cartTotalPrice * 0.2 : 0;
  const finalPrice = cartTotalPrice + priorityPrice;

  const isLocationLoading = addressStatus === 'loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="p-5">
      <h2 className="mb-6 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST">
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />

        <div className="mb-5 flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={userName}
          />
        </div>

        <div className="mb-3 flex flex-col sm:flex-row">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-3 rounded-md bg-red-100 p-2 text-xs text-red-600 ">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col items-center sm:flex-row">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
            />
            {addressStatus === 'error' && (
              <p className="mt-3 rounded-md bg-red-100 p-2 text-xs text-red-600 ">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-1 top-1">
              <Button
                disabled={isLocationLoading}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Location
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <Button disabled={isSubmitting || isLocationLoading} type="primary">
            {isSubmitting
              ? 'Placing Order...'
              : `Order now with ${formatCurrency(finalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'Please enter a valid phone number we need to connect you later.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // donot over use this
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
