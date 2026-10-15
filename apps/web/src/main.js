import { createGateway } from './gateway/index.js';

const gateway = createGateway();
const app = document.querySelector('#app');
app.textContent = 'MAB Global: kerangka siap (gateway: ' + gateway.name + ').';
