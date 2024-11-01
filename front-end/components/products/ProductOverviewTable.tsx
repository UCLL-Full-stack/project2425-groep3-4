import React, { useEffect, useState } from 'react';
import { ProductService } from '@services/ProductService';
import { Product } from '@types';
import Link from 'next/link';

const ProductOverviewTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const productService = new ProductService();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.productId}>
            <td>{product.productId}</td>
            <td>
              <Link href={`/products/${product.productId}`}>
                {product.name}
              </Link>
            </td>
            <td>{product.description}</td>
            <td>{product.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductOverviewTable;
