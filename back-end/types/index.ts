type Role = 'admin' | 'shipment employee' | 'warehouse_employee' | 'warehouse_manager' | 'user';

type UserInput = {
        id?: number;
        username: string;
        password: string;
        email: string;
        role: Role;
}

type ShipmentInput = {
    id?: number;
    status: string;
    shippedDate: Date;
    order: OrderInput;
}

type OrderInput = {
    id?: number;
    status: string;
    creationDate: Date;
    user: UserInput;
    products: ProductInput;
}

type OrderDetailInput = {
    id?: number;
    products: ProductInput;
    quantity: number;
}

type ProductInput = {
    id?: number;
    name: string;
    description: string;
    location: string;
}

type InventoryInput = {
    id?: number;
    products: ProductInput;
    quantity: number;
}