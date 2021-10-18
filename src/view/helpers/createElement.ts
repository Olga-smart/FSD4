export default function createElement(tag: string, className?: string): HTMLElement {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }

  return element;
}
