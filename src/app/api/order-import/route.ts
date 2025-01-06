import { createOrderController } from "@/controllers/order/order.factory";

export async function POST(request: Request) {
  const orderController = createOrderController();
  const { subscriptionID, planID, startDate, endDate, renewalDate, ...data } =
    await request.json();

  return await orderController.importOrder(data, {
    subscriptionID,
    planID,
    startDate: startDate,
    endDate: endDate,
    renewalDate: renewalDate,
  });
}
