export type User = {
    userId: number;
    username: string;
    password: string;
    role: string;
    orders?: Order[];
  };
  
  export type Product = {
    id: number;
    name: string;
    description: string;
    location: string;
    inventory?: Inventory;
    orderDetails?: OrderDetail[];
    orderOrderId?: number;
    Order?: Order;
  };
  
  export type Inventory = {
    id: number;
    details: Array<{
        id: number;
        inventoryId: number;
        productId: number;
        quantity: number;
        product: {
            id: number;
            name: string;
            description: string;
            location: string;
        };
    }>;
  };
  
  export type Order = {
    id: number;
    userId: number;
    user: User;
    products?: Product[];
    productDetails: { productId: number; quantity: number }[];
    status: string;
    creationDate: Date;
    orderDetails?: OrderDetail[];
    shipments?: Shipment[];
  };

  
  export type OrderDetail = {
    orderDetailId: number;
    orderId: number;
    productId: number;
    quantity: number;
    order: Order;
    product: Product;
  };
  
  export type Shipment = {
    shipmentId: number;
    orderId: number;
    status: string;
    shippedDate: Date;
    order: Order;
  };
  
  export type StatusMessage = {
    message: string;
    type: "error" | "success"
  };