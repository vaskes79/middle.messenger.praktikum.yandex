export const styles = `
<style>
  .bg,
  .container {
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transition: all .3s ease;
  }
  
  :host([open]) .bg, 
  :host([open]) .container {
    pointer-events: all;
    opacity: 1;
  }

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.6);
  }
  
  .container {
    background: var(--gray-100);
    width: 60%;
    height: 70%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 30%);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
  }

  header {
    padding-bottom: 8px;
    border-bottom: 1px solid var(--gray-400);
  } 

  .content {
    flex-basis: 100%;
    height: 100%;
    overflow-y: auto;
  }

  footer {
    padding-top: 8px;
    border-top: 1px solid var(--gray-400);
    display: flex;
    justify-content: end;
    gap: 8px;
  }

</style>
`;
