import { createOrderController } from "@/controllers/order/order.factory";

export async function POST(request: Request) {
  const orderController = createOrderController();
  const data = await request.json();
  
  return await orderController.importOrder(data);
}