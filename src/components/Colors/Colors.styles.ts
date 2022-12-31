export const styles = `
<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .box {
    flex: 1 1 160px;
    height: 80px; 
    color: var(--gray40);
    display: flex;
  }
  .box span {
    display: block;
    margin: auto;
    padding: 4px 12px;
  }
  .box--gray40,
  .box--gray30,
  .box--gray20,
  .box--gray10,
  .box--gray5, 
  .box--blue90, 
  .box--green100 {
    color: var(--gray70);
  }
</style>
`
