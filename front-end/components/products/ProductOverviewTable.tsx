import React, { useEffect, useState } from 'react';
import { ProductService } from '@services/ProductService';
import { Product } from '@types';
import Link from 'next/link';

type Props = { 
  products: Array<Product>
}

const ProductOverviewTable: React.FC<Props> = ({products}: Props) => {
    //const [products, setProducts] = useState<Product[]>([]);
    
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        name: '',
        description: '',
        location: '',
    });

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

    const handleAddProduct = async () => {
        try {
            const addedProduct = await productService.addProduct({
                productId: products.length + 1,
                name: newProduct.name || '',
                description: newProduct.description || '',
                location: newProduct.location || '',
            });
            setProducts([...products, addedProduct]);
            setNewProduct({ name: '', description: '', location: '' });
        } catch (err) {
            alert('Failed to add product');
            console.error(err);
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            await productService.deleteProduct(productId);
            setProducts(products.filter((product) => product.productId !== productId));
        } catch (err) {
            alert('Failed to delete product');
            console.error(err);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Product Overview</h2>
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>New</td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={newProduct.name}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, name: e.target.value })
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                value={newProduct.description}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, description: e.target.value })
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Location"
                                value={newProduct.location}
                                onChange={(e) =>
                                    setNewProduct({ ...newProduct, location: e.target.value })
                                }
                            />
                        </td>
                        <td>
                            <button className="btn btn-primary" onClick={handleAddProduct}>
                                Add
                            </button>
                        </td>
                    </tr>

                    {/* Displaying products */}
                    {products.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.location}</td>
                            <td>
                                <Link href={`/products/${product.productId}`} passHref>
                                    <button className="btn btn-info me-2">Details</button>
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteProduct(product.productId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductOverviewTable;
