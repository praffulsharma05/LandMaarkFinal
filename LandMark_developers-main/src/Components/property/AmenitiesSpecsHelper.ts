/* eslint-disable @typescript-eslint/no-explicit-any */

export const getGroupedSpecifications = (specifications: any): Record<string, Array<{ label: string; value: string; iconUrl?: string }>> => {
  const groupedSpecifications: Record<string, Array<{ label: string; value: string; iconUrl?: string }>> = {};

  if (specifications) {
    if (Array.isArray(specifications)) {
      groupedSpecifications['General'] = specifications.map((item: any) => ({
        label: item.name || item.key || item.label || 'Feature',
        value: item.value || 'Not specified',
        iconUrl: item.icon?.value || item.iconUrl || undefined
      }));
    } else if (typeof specifications === 'object' && specifications !== null) {
      const isGrouped = Object.values(specifications).some(val => Array.isArray(val));
      if (isGrouped) {
        Object.entries(specifications).forEach(([category, group]: [string, any]) => {
          if (Array.isArray(group)) {
            groupedSpecifications[category] = group.map((item: any) => ({
              label: item.name || item.key || item.label || 'Feature',
              value: item.value || 'Not specified',
              iconUrl: item.icon?.value || item.iconUrl || undefined
            }));
          }
        });
      } else {
        groupedSpecifications['General'] = Object.entries(specifications).map(([key, value]) => ({
          label: key,
          value: String(value),
        }));
      }
    }
  }

  return groupedSpecifications;
};
