import { OrderService } from "@/services/order/order.service";
import { SubsciptionOrder } from "@/services/order/order.types";
import { OrderImportDraft } from "@commercetools/platform-sdk";

export class OrderController {
  orderService: OrderService;
  constructor() {
    this.orderService = new OrderService();
  }

  async importOrder(importOrderDraft: OrderImportDraft, additionalData: SubsciptionOrder): Promise<Response> {
    const order = await this.orderService.importOrder(importOrderDraft, additionalData);
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
