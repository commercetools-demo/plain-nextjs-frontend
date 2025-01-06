import { commercetoolsClient } from "../commercetools/client";
import { Order, OrderImportDraft } from "@commercetools/platform-sdk";
import { SubsciptionOrder } from "./order.types";
export class OrderService {
  async importOrder(orderImport: OrderImportDraft, additionalData: SubsciptionOrder): Promise<Order> {
  
    
    const response = await commercetoolsClient
      .orders()
      .importOrder()
      .post({ body: {
        ...orderImport,
        lineItems: [
          {
            name: {
              "en-US": "Creators' App"
            },
            variant: {
              sku: "sonu_subscription_creator_app_sku",
            },
            quantity: 1,
            price: {
              value: orderImport.totalPrice
            }
          }
        ],
        custom: {
          type: {
            typeId: "type",
            key: "subscription-order"
          },
          fields: {
            "SubscriptionID": additionalData.subscriptionID,
            "PlanID": additionalData.planID,
            StartDate: additionalData.startDate,
            EndDate: additionalData.endDate,
            RenewalDate: additionalData.renewalDate
          }
        }
      } as OrderImportDraft })
      .execute().catch((error) => {
        console.error(error.body);
        throw error;
      });

    return response.body;
  }
}
