import { Order } from '@sheetbase/models';

const currencyCode = '$';
const supportPhone = '0123456789';
const supportEmail = 'contact@sheetbase.dev';

// tslint:disable:max-line-length
export function OrderTemplating({ host, item }: { host: string, item: Order }) {
  let productList = '';
  let i = 0;
  for (const key of Object.keys(item.items)) {
    const { product, qty } = item.items[key];
    i++;
    const productUrl = host + '/product/' + product._id;
    productList += (`
      <tr>
        <td style="text-align: center;">${ i }</td>
        <td style="width: 15%;">
          <a href="${ productUrl  }" target="_blank"><img style="width: 80%; border-radius: 10px;" src="${ product.thumbnail }" alt="${ product.title }" /></a>
        </td>
        <td>
          <p><a href="${ productUrl  }" target="_blank"><strong>${ product.title }</strong></a></p>
          <p><em>${ product.sku }</em></p>
        </td>
        <td style="text-align: center;">${ product.price } <em>(${ product.unit })</em></td>
        <td style="text-align: center;">${ qty }</td>
        <td style="text-align: center;">${ product.price * qty }</td>
      </tr>
    `);
  }
  return (`
    <p>Hello!</p>
    <p>We received your order, will process and contact you soon, please wait for our next email. Thank you for using our service!</p>

    <p><strong>Order detail:</strong></p>
    <ul>
      <li>Ref: <strong>${ item.$key }</strong></li>
      <li>Subtotal: ${ item.subtotal }</li>
      <li>Discount: ${ item.discountTotal }</li>
      <li>Total: <strong>${ item.total }</strong> <em>${ currencyCode }</em></li>
    </ul>

    <table style="width: 100%; max-width: 768px;">
      <tr style="background: #EEE;">
        <th>#</th>
        <th style="width: 50%;" colspan="2">Product</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Total</th>
      </tr>
      ${productList}
    </table>

    <p>For supporting, please contact us:</p>
    <ul>
      <li>Phone: <a href="tel:${ supportPhone }">${ supportPhone }</a></li>
      <li>Email: <a href="mailto:${ supportEmail }">${ supportEmail }</a></li>
    </ul>
    <p>Thank you!</p>
  `);
}
