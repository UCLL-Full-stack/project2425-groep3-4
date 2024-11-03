import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { ProductRepository } from '../../repository/memoryRepository/product.db';

jest.mock('../../repository/memoryRepository/product.db');

describe('ProductService', () => {
    let productService: ProductService;

    beforeEach(() => {
        productService = new ProductService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('given a product, when added to the service, then product is returned', async () => {
        // given
        const product = new Product(1, 'Product A', 'Description of Product A', 'Location A1');
        const addProductMock = jest.spyOn(ProductRepository.prototype, 'addProduct').mockResolvedValue(product);

        // when
        const result = await productService.addProduct(product);

        // then
        expect(result).toBe(product);
        expect(addProductMock).toHaveBeenCalledWith(product);
    });

    test('given a productId, when getProductById is called, then the correct product is returned', async () => {
        // given
        const product = new Product(1, 'Product A', 'Description of Product A', 'Location A1');
        jest.spyOn(ProductRepository.prototype, 'getProductById').mockResolvedValue(product);

        // when
        const result = await productService.getProductById(1);

        // then
        expect(result).toBe(product);
    });

    test('given a product, when updated, then product is returned with updated values', async () => {
        // given
        const product = new Product(1, 'Product A', 'Description', 'Location A1');
        const updatedProduct = { name: 'Updated Product A', location: 'Shelf B2' };
        jest.spyOn(ProductRepository.prototype, 'updateProduct').mockResolvedValue(new Product(1, 'Updated Product A', 'Description', 'Shelf B2'));

        // when
        const result = await productService.updateProduct(1, updatedProduct);

        // then
        expect(result?.getName()).toBe('Updated Product A');
        expect(result?.getLocation()).toBe('Shelf B2');
    });

    test('given a productId, when deleteProduct is called, then true is returned', async () => {
        // given
        jest.spyOn(ProductRepository.prototype, 'deleteProduct').mockResolvedValue(true);

        // when
        const result = await productService.deleteProduct(1);

        // then
        expect(result).toBe(true);
    });
});
