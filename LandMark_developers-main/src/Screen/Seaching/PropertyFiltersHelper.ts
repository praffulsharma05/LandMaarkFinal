type FilterOptionRecord = Record<string, unknown>;

export const getOptionValue = (option: FilterOptionRecord | string | null | undefined): string => {
  if (typeof option === 'string') return option;
  if (option && typeof option === 'object') return String(option.name ?? option.bhk ?? '');
  return '';
};

export const getOptionLabel = (option: FilterOptionRecord | string | null | undefined): string => {
  if (typeof option === 'string') return option;
  if (option && typeof option === 'object') {
    if (option.bhk) return `${option.bhk} BHK`;
    if (option.name) return String(option.name);
  }
  return '';
};
