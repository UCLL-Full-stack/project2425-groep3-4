import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ProductService } from '@services/ProductService';
import { Product } from '@types';

type Props = {
  product: Product;
};

const ProductDetail: React.FC<Props> = ({ product }: Props) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedProduct, setUpdatedProduct] = useState<Partial<Product>>({});
  const router = useRouter();

  const productService = new ProductService();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(product.productId);
        alert('Product deleted successfully');
        router.push('/');
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('Failed to delete product');
      }
    }
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const updated = await productService.updateProduct(product.productId, updatedProduct);
      alert('Product updated successfully');
      router.reload();
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('Failed to update product');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <h1>Product Details</h1>
      <p><strong>Product ID:</strong> {product.productId}</p>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Location:</strong> {product.location}</p>

      <div>
        <h2>Update Product</h2>
        <label>
          Name:
          <input
            type="text"
            value={updatedProduct.name ?? product.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Description:
          <input
            type="text"
            value={updatedProduct.description ?? product.description}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
          />
        </label>
        <br />
        <br />
        <label>
          Location:
          <input
            type="text"
            value={updatedProduct.location ?? product.location}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, location: e.target.value })}
          />
        </label>
        <br />
        <br />
        <button onClick={handleUpdate} disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update'}
        </button>
      </div>

      <button onClick={handleDelete} style={{ marginTop: '20px', color: 'red' }}>
        Delete Product
      </button>
    </div>
  );
};

export default ProductDetail;
