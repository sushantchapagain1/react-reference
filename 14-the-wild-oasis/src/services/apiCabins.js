import supabase from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('cabins could not be loaded');
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('cabin could not be deleted');
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabins/${imageName}`;

  // 1. create or edit cabin according to id.
  let query = supabase.from('cabins');

  // A. Create if id is not there
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B. Edit if there is Id.
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();
  console.log(data.id);

  if (error) {
    console.error(error);
    throw new Error('cabin could not be created');
  }

  // 2. Upload Image
  if (hasImagePath) return data;

  const { error: storageErr } = await supabase.storage
    .from('cabins')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageErr) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageErr);
    throw new Error('image could not be uploaded and cabin was not created');
  }

  return data;
}
