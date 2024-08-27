export type SelectProps = {
  onSelect: (option: number) => void;
};

export type InputProps = {
  onChange: (text: string) => void;
};

export type TimeProps = {
  onChange: (timeValue: string, timeUnit: string) => void;
};

export type DetailsProps = {
  onChange: (name: string, description: string) => void;
};

export type CategoryProps = {
  onChange: (category: string) => void;
};

export type AssetsProps = {
  onChange: (assets: string[]) => void;
};