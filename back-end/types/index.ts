type Role = 'admin' | 'employee' | 'manager' | 'user';
type Status = 'recieved' | 'processing' |'packing' |'shipping' | 'delivered';

type UserInput = {
    id?: number;
    username: string;
    password: string;
    email: string;
    role?: Role;
    order: OrderInput[];
}

type OrderInput = {
    id?: number;
    status: string;
    creationDate: Date;
    orderDetail: OrderDetailInput[];
    //shipment: ShipmentInput[];
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

/*
type ShipmentInput = {
    id?: number;
    status: Status;
    shippedDate: Date;
    order: OrderInput;
}
    */