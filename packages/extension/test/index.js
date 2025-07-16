import { css } from 'ttl-helpers';

const padding = '10px';

console.log(css`.hello {
  color: #000;

  ${padding && css`.something { 
    padding: ${padding};
  }`}
}`);