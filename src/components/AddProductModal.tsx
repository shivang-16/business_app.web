import React, { useState } from 'react';

interface Order {
  product: string;
  customer_name: string;
  customer_email: string;
  quantity: number;
  order_value: number;
}

interface AddOrderModalProps {
  onClose: () => void;
  onSave: (order: Order) => void;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ onClose, onSave }) => {
  const [newOrder, setNewOrder] = useState<Order>({
    product: '',
    customer_name: '',
    customer_email: '',
    quantity: 0,
    order_value: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'order_value' ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    // Perform basic validation
    if (
      !newOrder.product ||
      !newOrder.customer_name ||
      !newOrder.customer_email ||
      newOrder.quantity <= 0 ||
      newOrder.order_value <= 0
    ) {
      alert('Please fill out all fields with valid values.');
      return;
    }

    onSave(newOrder); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Add New Order</h2>
        <div className="space-y-4">
          {/* Product Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product</label>
            <select
              name="product"
              value={newOrder.product}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select a product</option>
              <option value="Product 1">Product 1</option>
              <option value="Product 2">Product 2</option>
              <option value="Product 3">Product 3</option>
            </select>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              name="customer_name"
              value={newOrder.customer_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Customer Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Email</label>
            <input
              type="email"
              name="customer_email"
              value={newOrder.customer_email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={newOrder.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              min="1"
            />
          </div>

          {/* Order Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Order Value ($)</label>
            <input
              type="number"
              name="order_value"
              value={newOrder.order_value}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              min="0.01"
              step="0.01"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Add Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrderModal;
