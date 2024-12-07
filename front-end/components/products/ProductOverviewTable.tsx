import React, { useState } from 'react';
import { ProductService } from '@services/ProductService';
import { Product } from '@types';
import Link from 'next/link';

type Props = {
    products: Array<Product>;
};

const ProductOverviewTable: React.FC<Props> = ({ products: initialProducts }: Props) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [newProduct, setNewProduct] = useState<Partial<Omit<Product, 'id'>>>({
        name: '',
        description: '',
        location: '',
    });



    const handleAddProduct = async () => {
        try {
            setLoading(true);
            const addedProduct = await ProductService.addProduct({
                name: newProduct.name || '',
                description: newProduct.description || '',
                location: newProduct.location || '',
            });

            setProducts([...products, { ...addedProduct, id: 0 }]);
            setNewProduct({ name: '', description: '', location: '' });
        } catch (err) {
            setError('Failed to add product');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const handleDeleteProduct = async (id: number) => {
        try {
            setLoading(true);
            await ProductService.deleteProduct(id); 
            setProducts(products.filter((product) => product.id !== id));
        } catch (err) {
            setError('Failed to delete product');
            console.error(err);
        } finally {
            setLoading(false);
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

                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.location}</td>
                            <td>
                                <Link href={`/products/${product.id}`} passHref>
                                    <button className="btn btn-info me-2">Details</button>
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteProduct(product.id)}
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
