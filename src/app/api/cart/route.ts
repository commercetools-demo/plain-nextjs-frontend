// import { createCartController } from '@/controllers/cart/cart.factory';

// export async function POST(request: Request) {
//   const cartController = createCartController();
//   const data = await request.json();
//   const { action } = data;

//   switch (action) {
//     case 'replicate':
//       return await cartController.replicateCart(request);
//     case 'checkout':
//       return await cartController.checkoutCart(request);
//     default:
//       return new Response(
//         JSON.stringify({ error: 'Invalid action' }),
//         { 
//           status: 400,
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );
//   }
// }

// export async function GET(request: Request) {
//   const cartController = createCartController();
//   const { searchParams } = new URL(request.url);
//   const cartId = searchParams.get('cartId');

//   if (!cartId) {
//     return new Response(
//       JSON.stringify({ error: 'Cart ID is required' }),
//       { 
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       }
//     );
//   }

//   return await cartController.getCart(cartId);
// }