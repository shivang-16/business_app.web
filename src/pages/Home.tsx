import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getOrders, editOrder, createOrder, deleteOrder, getTotalOrderValue } from '../actions/orderActions'; // API methods
import EditOrderModal from '../components/EditProduct';
import AddOrderModal from '../components/AddProductModal'; 
import debounce from 'lodash.debounce';
import { orderData } from '../redux/slices/orderSlice';
import toast from 'react-hot-toast';

interface Order {
  _id: string;
  product: string;
  customer_name: string;
  customer_email: string;
  quantity: number;
  order_value: number;
}

const Home: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch()

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showMyProducts, setShowMyProducts] = useState(false);
  const [totalOrderValue, setTotalOrderValue] = useState<number>(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete confirmation modal
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null); // Store order to be deleted

  const fetchOrders = async (page: number = 1, search: string = '', userFilter: boolean = false) => {
    const response = await getOrders(page, 10, search, userFilter);
    if (response && response.data) {
      setOrders(response.data.data);
      dispatch(orderData(response.data.data));
      setCurrentPage(response.data.pagination.currentPage);
      setTotalPages(response.data.pagination.totalPages);
    }
  };

  const fetchTotalOrderValue = async () => {
    const response = await getTotalOrderValue();
    if (response && response.data) {
      setTotalOrderValue(response.data.totalOrderValue);
    }
  };

  const handleSearch = debounce((search: string) => {
    fetchOrders(1, search, showMyProducts);
  }, 500);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchOrders(currentPage - 1, searchQuery, showMyProducts);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchOrders(currentPage + 1, searchQuery, showMyProducts);
    }
  };

  const toggleShowMyProducts = () => {
    setShowMyProducts(prevState => !prevState);
    fetchOrders(1, searchQuery, !showMyProducts); 
  };

  // Open Edit Modal
  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedOrder(null);
    setIsEditModalOpen(false);
  };

  // Update Order
  const handleUpdateOrder = async (updatedOrder: Order) => {
    if (selectedOrder) {
      const res = await editOrder(selectedOrder._id, updatedOrder);
      if(res.data.success) {
        toast.success(res.data.message || "Order updated");
        fetchOrders(currentPage, searchQuery, showMyProducts); 
        handleCloseEditModal();
      } else {
        toast.error(res.data.error || "Error updating order");
      }
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddOrder = async (newOrder: Order) => {
    await createOrder(newOrder);
    fetchOrders(currentPage, searchQuery, showMyProducts);
    handleCloseAddModal();
  };

  const handleDelete = (order: Order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (orderToDelete) {
      const res = await deleteOrder(orderToDelete._id);
      if (res.data.success) {
        toast.success(res.data.message || "Order deleted");
        fetchOrders(currentPage, searchQuery, showMyProducts);
        setIsDeleteModalOpen(false);
      } else {
        toast.error(res.data.error || "Error deleting order");
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  useEffect(() => {
    fetchOrders();
    fetchTotalOrderValue();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="p-6">
        <div className='mb-4 flex flex-col'>
        <h1 className="text-2xl font-bold text-center">Order List</h1>
         {/* Total Order Value */}
         <div className="mt-4 text-xl font-semibold text-center bg-orange-400 inline-block m-auto p-2 rounded-lg">
          Total Order Value: ${totalOrderValue.toFixed(2)}
        </div>
        </div>

        {/* Search Bar with Add Button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex w-2/3 border border-green-500 rounded-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search orders..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleShowMyProducts}
              className={`ml-4 px-6 py-2 text-white font-semibold rounded-lg ${
                showMyProducts ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {showMyProducts ? 'Show All Products' : 'Show My Products'}
            </button>
            <button
              onClick={handleOpenAddModal}
              className="ml-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
            >
              ➕ Add Product
            </button>
          </div>
        </div>

        {/* Order Table */}
        <div className="overflow-x-auto shadow border rounded-lg">
          <table className="table-auto w-full border-collapse text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Customer Email</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Order Value</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{order.product}</td>
                  <td className="border px-4 py-2">{order.customer_name}</td>
                  <td className="border px-4 py-2">{order.customer_email}</td>
                  <td className="border px-4 py-2">{order.quantity}</td>
                  <td className="border px-4 py-2">${order.order_value.toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(order)}
                      className="text-blue-500 hover:underline"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(order)}
                      className="text-red-500 hover:underline ml-2"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      {isEditModalOpen && selectedOrder && (
        <EditOrderModal
          order={selectedOrder}
          onClose={handleCloseEditModal}
          onSave={handleUpdateOrder}
        />
      )}
      {isAddModalOpen && (
        <AddOrderModal onClose={handleCloseAddModal} onSave={handleAddOrder} />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && orderToDelete && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Are you sure you want to delete this order?</h2>
            <div className="flex justify-end">
              <button
                onClick={handleCloseDeleteModal}
                className="px-4 py-2 mr-4 text-gray-700 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
