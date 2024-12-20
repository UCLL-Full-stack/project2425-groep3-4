import { Product } from '../../model/product';

test('given: valid product values, when: product is created, then: product is initialized correctly', () => {
    // given
    const productData = {
        id: 1,
        name: 'Test Product',
        description: 'A product for testing',
        location: 'Warehouse A',
    };

    // when
    const product = new Product(productData);

    // then
    expect(product.getId()).toEqual(productData.id);
    expect(product.getName()).toEqual(productData.name);
    expect(product.getDescription()).toEqual(productData.description);
    expect(product.getLocation()).toEqual(productData.location);
});

test('given: empty name, when: product is created, then: an error is thrown', () => {
    // given
    const productData = {
        id: 1,
        name: '',
        description: 'A product for testing',
        location: 'Warehouse A',
    };

    // when
    const createProduct = () => new Product(productData);

    // then
    expect(createProduct).toThrow('Name is required');
});
