import { styles } from './Avatar.styles'

export const tmpl = document.createElement('template');

tmpl.innerHTML = `
  ${styles}
  <div class="container">
    <img 
      class="img" 
      src="https://avatars.githubusercontent.com/u/3108240?s=400&u=09f23a416bc3777208ff6f2131a494796bb27eaf&v=4" 
      alt="Vasily Guzov" 
      loading="lazy">
  </div>
`;
