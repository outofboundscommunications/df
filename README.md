# df
df code migration
Files:
1. OrderStatusPageAddlScripts - scripts on the settings/checkout > Order status page additional scripts page on Shopify that will be removed by Shopify Aug 28, 2025 - need to migrate any necessary code to the Shopify custom pixel: "ShopifyCustomPixel_GoogleTagManager"
2. snippets:external-ecommerce-checkout.liquid - custom code which appears to be pushing most of the transaction data on the order thank you page
3. checkout.liquid - all of this custom code looks like it can be deleted: https://imgur.com/t7KwHHH  <== please confirm Marketlytics

Target file for migration:
** ShopifyCustomPixel_GoogleTagManager ** - the new custom pixel we are going to deploy <== code migrated to this file here
For more information: https://admin.shopify.com/store/dwarven-forge/settings/checkout/customizations-report
