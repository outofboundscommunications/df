// GTM Bootstrap (kept in for preview mode testing; safe if GTM preview is used)
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WQPQX7J');

// Optional: declare dataLayer to prevent reference errors (won’t be used for now)
window.dataLayer = window.dataLayer || [];

// Product Viewed Event (console log version)
analytics.subscribe("product_viewed", (event) => {
  const productTitle = event.data?.productVariant?.title;
  if (productTitle) {
    const payload = {
      event: "product_viewed",
      product_title: productTitle,
    };
    console.log("Test Event: product_viewed", payload);
    // To go live: replace console.log(...) with dataLayer.push(payload)
  }
});

// Checkout Completed Event (console log version)
analytics.subscribe("checkout_completed", (event) => {
  const checkout = event.data?.checkout;
  const order = checkout?.order;
  const shippingAddress = checkout?.shippingAddress;
  const clientId = event.clientId;
  const userId = checkout?.order?.customer?.id

  const lineItems = (checkout?.lineItems || []).map((item) => ({
    item_id: item.variant?.sku || '',
    item_name: item.title || '',
    item_brand: item.variant?.product?.vendor || '',
    item_category: item.variant?.product?.type || '',
    item_category2: item.variant?.product?.id || '',
    item_category3: item.variant?.image?.src || '',
    price: item.variant?.price?.amount || 0,
    quantity: item.quantity || 0,
    discount: item.discountAllocations?.[0]?.amount?.amount || 0,
    currency: checkout?.currencyCode || 'USD',
  }));

  const isFirstOrder = order?.customer?.isFirstOrder;
  const customerType = isFirstOrder === true ? 'newcustomer' : 'repeatcustomer';

  // Purchase Event
  const purchaseEvent = {
    event: "custom_purchase",
    page_type: "purchase",
    user_id: userId,
    customerType,
    ecommerce: {
      currency: checkout?.currencyCode || 'USD',
      affiliation: "Dwarven Forge",
      value: checkout?.totalPrice?.amount || 0,
      transaction_id: order?.id || '',
      coupon: checkout?.discountAllocations?.[0]?.title || '',
      payment_type: checkout?.transactions?.[0]?.gateway || '',
      shipping_tier: "standard shipping",
      shipping: checkout?.shippingLine?.price?.amount || 0,
      tax: checkout?.totalTax?.amount || 0,
      discount: checkout?.discountAllocations?.[0]?.value?.amount || 0,
      items: lineItems,
    },
  };
  console.log("isFirstOrder Value: ", isFirstOrder);
  console.log("Test Event: custom_purchase", purchaseEvent);
  // To go live: replace console.log(...) with dataLayer.push(purchaseEvent)

  // User Info Event
  const userInfoEvent = {
    event: "user_info",
    user_id: userId,
    currency: checkout?.currencyCode || 'USD',
    value: checkout?.totalPrice?.amount || 0,
    transaction_id: order?.id || '',
    first_name: shippingAddress?.firstName || '',
    last_name: shippingAddress?.lastName || '',
    email: checkout?.email || '',
    city: shippingAddress?.city || '',
    country: shippingAddress?.country || '',
    street: [shippingAddress?.address1, shippingAddress?.address2].filter(Boolean).join(' '),
    state: shippingAddress?.province || '',
    phone: checkout?.phone || '',
    zip: shippingAddress?.zip || '',
  };
  console.log("Test Event: user_info", userInfoEvent);
  // To go live: replace console.log(...) with dataLayer.push(userInfoEvent)

  // Order Status Page Event
  const statusPageEvent = {
    event: "Order status page",
  };
  console.log("Test Event: Order status page", statusPageEvent);
  // To go live: replace console.log(...) with dataLayer.push(statusPageEvent)
});