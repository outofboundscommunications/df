<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-WQPQX7J');</script>
  <!-- End Google Tag Manager -->
  
   {% if first_time_accessed == true and post_purchase_page_accessed == false %}
  <script>
var customer_type = ((Number({{customer.orders_count}}) || 0) > 1) ? 'repeatcustomer' : 'newcustomer';
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      'event': "custom_purchase",
      'page_type': "purchase",
      'user_id': '{{ customer.id }}',
'customerType': customer_type,
      'ecommerce': {
        'currency': "{{ shop.currency }}",
        'affiliation' : "{{- shop.name -}}",
        'value': '{{ checkout.total_price | money_without_currency }}',
        {% if checkout.order_id != empty %}
        'transaction_id': "{{ checkout.order_id }}", 
        {% else %}
        'transaction_id': "{{ checkout.id }}",   
        {% endif %}
        {% if checkout.discount_applications %}
        'coupon': "{{- checkout.discount_applications[0].title -}}",
        {% endif %}
        'payment_type': "{{ order.transactions[0].gateway}}",
        'shipping_tier': "standard shipping",
        'shipping': {{ checkout.shipping_price | money_without_currency }},
        'tax': {{ checkout.tax_price | money_without_currency }},
        'discount': {{- checkout.discounts_amount | times: 0.01 -}},
        'items': [
            {%- for line_item in checkout.line_items -%}
            {
              {% if line_item.sku != blank %}
              'item_id': "{{- line_item.sku -}}", 
              {% else %}
              'item_id': "{{- line_item.product_id -}}", 
              {% endif %}  
              'item_name': "{{- line_item.product.title -}}",   
              'item_brand': "{{- line_item.vendor -}}", 
              'item_category': "{{- line_item.product.type -}}",
              'item_category2': "{{- line_item.variant_id -}}",
              'item_category3': "{{- line_item.image | image_url -}}", 
              'item_category4': "{{ line_item.inventory_quantity }}",
              'price': '{{ line_item.final_price | money_without_currency }}',
              'quantity': {{ line_item.quantity }},  
              {% if line_item.line_level_discount_allocations.size > 0 %} 
              {% for discount_allocation in item.line_level_discount_allocations %} 
                'discount': {{ discount_allocation.amount | money_without_currency }},
              {% endfor %}  
              {% else %}
              'discount': 0.00,
              {% endif %}  
              'currency' : "{{ shop.currency }}",
            },
            {%- endfor -%} 
          ]
      }
    });
    </script>
    
    {%- if customer -%}
      <script>
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
             'event':'user_info', 
             'currency': "{{ shop.currency }}",
             'value': '{{ checkout.total_price | money_without_currency }}',
             {% if checkout.order_id != empty %}
              'transaction_id': "{{ checkout.order_id }}", 
              {% else %}
              'transaction_id': "{{ checkout.id }}",   
              {% endif %}
             'user_id': '{{ checkout.id }}',
             'first_name': '{{- customer.first_name -}}',
             'last_name': '{{- customer.last_name -}}',
             'email': '{{- customer.email -}}',
             'city': '{{- customer.default_address.city -}}',
             'country': '{{- customer.default_address.country -}}', 
             'street': '{{- customer.default_address.address1 -}} {{- customer.default_address.address2 -}}', 
             'state': '{{- checkout.billing_address.province -}}', 
             'phone': '{{- customer.phone -}}', 
             'zip': '{{- customer.default_address.zip -}}', 
        });
      </script>
  {%- endif -%}
  {%- endif -%}
    
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WQPQX7J"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <script>
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({
        'event' : 'Order status page'
        });
      </script>