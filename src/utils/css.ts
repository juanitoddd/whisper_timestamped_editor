export function classNames(classes: Record<string, boolean>) {
  const toBeClasses = Object.keys(classes).map((key) =>
    classes[key] === true ? key : '',
  );
  return toBeClasses.join(' ');
}

export const tagColors = [
  {
    name: "orange",
    background: "#fff7e6",
    border: "#ffd591"
  },
  {
    name: "green",
    background: "#f6ffed",
    border: "#b7eb8f"
  },
  {
    name: "magenta",
    background: "#fff0f6",
    border: "#ffadd2"
  },
  {
    name: "gold",
    background: "#fffbe6",
    border: "#ffe58f"
  },
  {
    name: "geekblue",
    background: "#f0f5ff",
    border: "#adc6ff"
  },
  {
    name: "lime",
    background: "#fcffe6",
    border: "#eaff8f"
  },
  {
    name: "red",
    background: "#fff1f0",
    border: "#ffa39e"
  },
  {
    name: "gray",
    background: "#fafafa",
    border: "#d9d9d9"
  },
  {
    name: "purple",
    background: "#f9f0ff",
    border: "#d3adf7"
  },
  {
    name: "default",
    background: "#f0f0f0",
    border: "#d9d9d9"
  },
  {
    name: "volcano",
    background: "#fff2e8",
    border: "#ffbb96"
  },
  {
    name: "blue",
    background: "#e6f7ff",
    border: "#91d5ff"
  },
  {
    name: "cyan",
    background: "#e6fffb",
    border: "#87e8de"
  }
];
