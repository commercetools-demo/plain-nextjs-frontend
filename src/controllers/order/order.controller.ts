import { OrderService } from "@/services/order/order.service";
import { OrderImportDraft } from "@commercetools/platform-sdk";

export class OrderController {
  orderService: OrderService;
  constructor() {
    this.orderService = new OrderService();
  }

  async importOrder(importOrderDraft: OrderImportDraft): Promise<Response> {
    const order = await this.orderService.importOrder(importOrderDraft);
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
