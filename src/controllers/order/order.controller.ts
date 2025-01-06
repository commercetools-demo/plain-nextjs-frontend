import { OrderService } from "@/services/order/order.service";
import { OrderImportDraft } from "@commercetools/platform-sdk";

export class OrderController {
  orderService: OrderService;
  constructor() {
    this.orderService = new OrderService();
  }

  async importOrder(importOrderDraft: OrderImportDraft, SubscriptionID: string, PlanID: string): Promise<Response> {
    const order = await this.orderService.importOrder(importOrderDraft, SubscriptionID, PlanID);
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
