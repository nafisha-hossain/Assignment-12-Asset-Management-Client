import { useForm } from 'react-hook-form';
import Title from '../../components/Title/Title';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../utils/alert';

const AddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      product_name: '',
      product_type: '',
      product_quantity: '',
    },
  });

  const onSubmit = async (data) => {
    const assetInfo = {
      ...data,
      availability: 'Available',
      added_date: new Date(),
      request_count: 0,
      provider_info: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      },
    };

    try {
      const { data: resData } = await axiosSecure.post('/assets', assetInfo);
      if (resData.insertedId) {
        reset();
        successAlert('Your asset has been added');
      }
    } catch (error) {
      console.error(error);
      errorAlert(error.message || 'Failed to add asset');
    }
  };

  return (
    <section className="container mb-24 pt-40">
      <Title title="AssetAura | Add Asset" />
      <div className="mx-auto w-full rounded-md bg-white shadow-form dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-2xl md:mt-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" noValidate>
            {/* Product Name */}
            <div>
              <label
                htmlFor="product_name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                {...register('product_name', { required: 'Product name is required' })}
                type="text"
                id="product_name"
                placeholder="product name here"
                aria-invalid={errors.product_name ? 'true' : 'false'}
                className={`block w-full rounded border p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white sm:text-sm
                  ${
                    errors.product_name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-blue-300'
                  }`}
              />
              {errors.product_name && (
                <p className="mt-1 text-sm text-red-600">{errors.product_name.message}</p>
              )}
            </div>

            {/* Product Type */}
            <div>
              <label
                htmlFor="product_type"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Type
              </label>
              <select
                {...register('product_type', { required: 'Product type is required' })}
                id="product_type"
                defaultValue=""
                aria-invalid={errors.product_type ? 'true' : 'false'}
                className={`block w-full rounded border p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white sm:text-sm
                  ${
                    errors.product_type
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-blue-300'
                  }`}
              >
                <option disabled value="">
                  Choose product type
                </option>
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
              {errors.product_type && (
                <p className="mt-1 text-sm text-red-600">{errors.product_type.message}</p>
              )}
            </div>

            {/* Product Quantity */}
            <div>
              <label
                htmlFor="product_quantity"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Quantity
              </label>
              <input
                {...register('product_quantity', {
                  required: 'Product quantity is required',
                  valueAsNumber: true,
                  min: { value: 1, message: 'Quantity must be at least 1' },
                })}
                type="number"
                id="product_quantity"
                placeholder="product quantity here"
                aria-invalid={errors.product_quantity ? 'true' : 'false'}
                className={`block w-full rounded border p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white sm:text-sm
                  ${
                    errors.product_quantity
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-blue-300'
                  }`}
              />
              {errors.product_quantity && (
                <p className="mt-1 text-sm text-red-600">{errors.product_quantity.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddAsset;
