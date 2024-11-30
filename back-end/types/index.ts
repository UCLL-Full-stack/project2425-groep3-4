type Role = 'admin' | 'shipment employee' | 'warehouse_employee' | 'warehouse_manager' | 'user';
type Status = 'recieved' | 'processing' |'packing' | 'shipping'


type UserInput = {
    id?: number;
    username: string;
    password: string;
    email: string;
    role: Role;
    order: OrderInput[];
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
    orderDetail: OrderDetailInput[];
    shipment: ShipmentInput[];
    product: ProductInput[];
    user: UserInput;
}

type OrderDetailInput = {
    id?: number;
    quantity: number;
    order: OrderInput;
    product: ProductInput;
}

type ProductInput = {
    id?: number;
    name: string;
    description: string;
    location: string;
}

type InventoryInput = {
    id?: number;
    product: ProductInput;
    quantity: number;
}