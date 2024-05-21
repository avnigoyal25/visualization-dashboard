
export const groupAndAggregateData = (data, key, value) => {
    const groupedData = data.reduce((result, item) => {
      const groupKey = item[key];
      if (!result[groupKey]) {
        result[groupKey] = 0;
      }
      result[groupKey] += item[value];
      return result;
    }, {});
  
    return Object.keys(groupedData).map(groupKey => ({
      label: groupKey,
      value: groupedData[groupKey]
    }));
  };
  