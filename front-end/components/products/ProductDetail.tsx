import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ProductService } from '@services/ProductService';
import { Product } from '@types';
import Link from 'next/link';

type Props = {
  product: Product;
};

const ProductDetail: React.FC<Props> = ({ product }: Props) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedProduct, setUpdatedProduct] = useState<Partial<Product>>({});
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await ProductService.deleteProduct(product.id);
        alert('Product deleted successfully');
        router.push('/products');
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('Failed to delete product');
      }
    }
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const updated = await ProductService.updateProduct(product.id, updatedProduct);
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
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Product Information</h5>
          <p><strong>Product ID:</strong> {product.id}</p>
          <div className="mb-3">
            <label className="form-label fw-bold">Name:</label>
            <input
              type="text"
              className="form-control"
              value={updatedProduct.name ?? product.name}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Description:</label>
            <input
              type="text"
              className="form-control"
              value={updatedProduct.description ?? product.description}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Location:</label>
            <input
              type="text"
              className="form-control"
              value={updatedProduct.location ?? product.location}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, location: e.target.value })}
            />
          </div>
          <button className="btn btn-primary me-2" onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
      </div>
      <Link href="/products" legacyBehavior>
        <a className="btn btn-secondary mt-3">Back to Products</a>
      </Link>
    </div>
  );
};

export default ProductDetail;
