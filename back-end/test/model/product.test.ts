import { Product } from '../../model/product';

test('given valid values for product, when product is created, then product is created with those values', () => {
    // given
    const productId = 1;
    const name = 'Product A';
    const description = 'Description of Product A';
    const location = 'Location A1';

    // when
    const product = new Product(productId, name, description, location);

    // then
    expect(product.getProductId()).toBe(productId);
    expect(product.getName()).toBe(name);
    expect(product.getDescription()).toBe(description);
    expect(product.getLocation()).toBe(location);
});

test('given a product, when name is updated, then product has the new name', () => {
    // given
    const product = new Product(1, 'Old Product Name', 'Description', 'Location A1');

    // when
    product.setName('New Product Name');

    // then
    expect(product.getName()).toBe('New Product Name');
});

test('given a product, when description is updated, then product has the new description', () => {
    // given
    const product = new Product(1, 'Product A', 'Old Description', 'Location A1');

    // when
    product.setDescription('New Description');

    // then
    expect(product.getDescription()).toBe('New Description');
});

test('given a product, when location is updated, then product has the new location', () => {
    // given
    const product = new Product(1, 'Product A', 'Description', 'Old Location');

    // when
    product.setLocation('New Location');

    // then
    expect(product.getLocation()).toBe('New Location');
});
