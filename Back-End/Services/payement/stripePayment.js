require('dotenv').config();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);


const createStripeSession = async (products, totalAmount, orderId) =>{
  const frontend_url = process.env.FRONTEND_URL;

    try {
        // Prepare line items for Stripe checkout
        const lineItems = [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Software Pro Order Payment',
                },
                unit_amount: totalAmount * 100,
              },
              quantity: 1, 
            }
          ];

    //  // Optional: Add a delivery fee
    // lineItems.push({
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: 'Delivery Fee',
    //       },
    //       unit_amount: 1000, // $10 delivery fee in cents
    //     },
    //     quantity: 1,
    //   });

    // Create Stripe checkout session

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${frontend_url}/verifyOrder?success=true&orderId=${orderId}`,
        cancel_url: `${frontend_url}/verifyOrder?success=false&orderId=${orderId}`,
    });
    return { success: true, sessionUrl: session.url};

  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return { success: false, message: 'Failed to create Stripe session' };
  }
}

module.exports = { createStripeSession };