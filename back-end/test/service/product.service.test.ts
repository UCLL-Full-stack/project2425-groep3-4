import productService from '../../service/product.service'; 
import productDb from '../../repository/product.db';
import { Product } from '../../model/product';
import { ProductInput } from '../../types';

jest.mock('../../repository/product.db', () => ({
  getAllProducts: jest.fn(),
  getProductById: jest.fn(),
  createProduct: jest.fn(),
  deleteProduct: jest.fn(),
  updateProduct: jest.fn(),
}));

const mockProductDb = jest.mocked(productDb);

describe('Product Service', () => {
  const sampleProduct = new Product({
    name: 'Sample Product',
    description: 'A sample product for testing',
    location: 'Aisle 1',
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllProducts should return all products', async () => {
    mockProductDb.getAllProducts.mockResolvedValue([sampleProduct]);

    const products = await productService.getAllProducts();

    expect(products).toEqual([sampleProduct]);
    expect(mockProductDb.getAllProducts).toHaveBeenCalledTimes(1);
  });

  // Ensure there is at least one valid test
  test('dummy test', () => {
    expect(true).toBe(true);
  });

  test('getProductById should return the product if it exists', async () => {
    mockProductDb.getProductById.mockResolvedValue(sampleProduct);

    const product = await productService.getProductById(1);

    expect(product).toEqual(sampleProduct);
    expect(mockProductDb.getProductById).toHaveBeenCalledWith({ id: 1 });
  });
});
