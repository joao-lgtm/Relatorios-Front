export function Ordenar(
  data: any[],
  value: string,
  direction: "asc" | "desc" = "asc"
) {
  const sorted = [...data].sort((a, b) => {
    const x = a?.[value];
    const y = b?.[value];

    if (x === null || x === undefined) return 1;
    if (y === null || y === undefined) return -1;

    if (typeof x === "number" && typeof y === "number") {
      return direction === "asc" ? x - y : y - x;
    }

    if (x instanceof Date && y instanceof Date) {
      return direction === "asc"
        ? x.getTime() - y.getTime()
        : y.getTime() - x.getTime();
    }

    return direction === "asc"
      ? String(x).localeCompare(String(y))
      : String(y).localeCompare(String(x));
  });

  return sorted;
}
