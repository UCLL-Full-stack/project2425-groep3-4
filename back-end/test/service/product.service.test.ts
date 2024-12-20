import productService from '../../service/product.service';
import productDb from '../../repository/product.db';
import { Product } from '../../model/product';


jest.mock('../../repository/product.db');

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
        // Arrange
        mockProductDb.getAllProducts.mockResolvedValue([sampleProduct]);

        // Act
        const products = await productService.getAllProducts();

        // Assert
        expect(products).toEqual([sampleProduct]);
        expect(mockProductDb.getAllProducts).toHaveBeenCalledTimes(1);
    });

    test('getProductById should return the product if it exists', async () => {
        // Arrange
        mockProductDb.getProductById.mockResolvedValue(sampleProduct);

        // Act
        const product = await productService.getProductById(1);

        // Assert
        expect(product).toEqual(sampleProduct);
        expect(mockProductDb.getProductById).toHaveBeenCalledWith({ id: 1 });
    });

    test('getProductById should throw an error if the product does not exist', async () => {
        // Arrange
        mockProductDb.getProductById.mockResolvedValue(null);

        // Act & Assert
        await expect(productService.getProductById(1)).rejects.toThrow('No products with id: 1');
        expect(mockProductDb.getProductById).toHaveBeenCalledWith({ id: 1 });
    });

    test('createProduct should create a new product', async () => {
        // Arrange
        mockProductDb.createProduct.mockResolvedValue(sampleProduct);

        // Act
        const product = await productService.createProduct({
            name: 'Sample Product',
            description: 'A sample product for testing',
            location: 'Aisle 1',
        });

        // Assert
        expect(product).toEqual(sampleProduct);
        expect(mockProductDb.createProduct).toHaveBeenCalledWith(sampleProduct);
    });

    test('deleteProduct should delete the product if it exists', async () => {
        // Arrange
        mockProductDb.deleteProduct.mockResolvedValue(sampleProduct);

        // Act
        const product = await productService.deleteProduct(1);

        // Assert
        expect(product).toEqual(sampleProduct);
        expect(mockProductDb.deleteProduct).toHaveBeenCalledWith(1);
    });

    test('deleteProduct should throw an error if the product could not be deleted', async () => {
        // Arrange
        mockProductDb.deleteProduct.mockResolvedValue(null);

        // Act & Assert
        await expect(productService.deleteProduct(1)).rejects.toThrow('Product could not be deleted');
        expect(mockProductDb.deleteProduct).toHaveBeenCalledWith(1);
    });

    test('updateProduct should update the product if it exists', async () => {
        // Arrange
        mockProductDb.updateProduct.mockResolvedValue(sampleProduct);

        // Act
        const updatedProduct = await productService.updateProduct(sampleProduct);

        // Assert
        expect(updatedProduct).toEqual(sampleProduct);
        expect(mockProductDb.updateProduct).toHaveBeenCalledWith(sampleProduct);
    });

    test('updateProduct should throw an error if the product could not be updated', async () => {
        // Arrange
        mockProductDb.updateProduct.mockResolvedValue(null);

        // Act & Assert
        await expect(productService.updateProduct(sampleProduct)).rejects.toThrow('Product could not be deleted');
        expect(mockProductDb.updateProduct).toHaveBeenCalledWith(sampleProduct);
    });
});
