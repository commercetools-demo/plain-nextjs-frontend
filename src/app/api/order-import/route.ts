import { createOrderController } from "@/controllers/order/order.factory";

export async function POST(request: Request) {
  const orderController = createOrderController();
  const { SubscriptionID, PlanID, ...data} = await request.json();
  
  return await orderController.importOrder(data, SubscriptionID, PlanID);
}