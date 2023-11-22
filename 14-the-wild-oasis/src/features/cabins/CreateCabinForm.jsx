import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { createEditCabin } from '../../services/apiCabins';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ editCabinData = {} }) {
  const queryClient = useQueryClient();

  const { id: editId, ...editValues } = editCabinData;
  const isEditMode = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditMode ? editValues : {},
  });
  const { errors } = formState;

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationKey: ['create-cabin'],
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('cabin created successfully!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationKey: ['edit-cabin'],
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('cabin edited successfully!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function submit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditMode)
      editCabin({ newCabinData: { ...data, image: image }, id: editId });
    else createCabin({ ...data, image: image });
  }

  function onError() {
    // console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(submit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isCreating || isEditing}
          id="name"
          {...register('name', { required: 'This Field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isCreating || isEditing}
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This Field is required',
            min: {
              value: 1,
              message: 'Minimum capacity should be 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isCreating || isEditing}
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This Field is required',
            min: {
              value: 1,
              message: 'Price should be greater than 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isCreating || isEditing}
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This Field is required',
            validate: (value) => {
              return (
                // if validation fails then the mssg is thrown else it will pass.
                value <= getValues().regularPrice ||
                'Discount should be less than regular price'
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          disabled={isCreating || isEditing}
          id="description"
          defaultValue=""
          {...register('description', { required: 'This Field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditMode ? false : 'This Field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating || isEditing}>
          {isEditMode ? 'Edit' : 'Create new'} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
