type ItemT = HTMLElement & { data: unknown };

export function generateCotnent<ItemType extends ItemT, ItemDataType = unknown>(
  target: HTMLElement,
  elemName: string,
  itemList: ItemDataType[]
) {
  if (target) {
    itemList.forEach((data) => {
      const elem = document.createElement(elemName) as ItemType;
      elem.data = data;
      target.append(elem);
    });
  }
}
