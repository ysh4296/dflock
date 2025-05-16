export const formatGold = (value: number): string => {
  const units = [
    { unit: "억", value: 1_0000_0000 },
    { unit: "만", value: 1_0000 },
  ];

  let result = "";
  let remaining = value;

  for (const { unit, value: unitValue } of units) {
    if (remaining >= unitValue) {
      const count = Math.floor(remaining / unitValue);
      result += `${count}${unit} `;
      remaining %= unitValue;
    }
  }

  return result.trim();
};
