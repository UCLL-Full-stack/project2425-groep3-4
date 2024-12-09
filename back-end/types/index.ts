type Role = 'admin' | 'employee' | 'manager' | 'user';
type Status = 'recieved' | 'processing' |'packing' |'shipping' | 'delivered';

type UserInput = {
    id?: number;
    username: string;
    password: string;
    email: string;
    role: Role;
}

type OrderInput = {
    id?: number;
    status: Status;
    creationDate: Date;
    orderDetail: OrderDetailInput[];
    user: UserInput;
}

type OrderDetailInput = {
    id?: number;
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
    product: ProductInput[];
    quantity: number;
}

export {
    Role,
    Status,
    UserInput,
    OrderInput,
    OrderDetailInput,
    ProductInput,
}