import { Thread } from '@sheetbase/models';

export function MessageTemplating({ item }: { host: string, item: Thread }) {
  const { displayName, email, content } = item;
  return (`
    <p>Hello${ !!displayName ? (' ' + displayName) : '' },</p>
    <p>We recieved your contact message, will reply soon!</p>
    <p><strong>Contact info:</strong></p>
    <ul>
      <li>Name: <strong>${ displayName || 'n/a' }</strong></li>
      <li>Email: <strong>${ email }</strong></li>
    </ul>
    <p><strong>Detail:</strong></p>
    <p>${ content.replace(/(?:\r\n|\r|\n)/g, '<br />') }</p>
  `);
}