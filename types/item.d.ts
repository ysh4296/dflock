type Item = {
  id: number;
  name: string;
  quantity: number;
  probability: number;
};

type Gold = { name: string; quantity: number; gold: number };

type SimulationTrial = {
  trial: number;
  acquiredItems: { name: string; count: number }[];
};
