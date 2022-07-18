const extractFrontMatter = (entireFile) => {
  const [, dataString, content] = entireFile.split('---');
  const data = dataString
    .split('\n')
    .filter((line) => line !== '')
    .reduce((previousValue, currentValue) => {
      const splitLine = currentValue.split(':');
      const key = splitLine.shift();
      const value = splitLine.join(':').replaceAll("'", '').trim();
      return { [key]: value, ...previousValue };
    }, {});
  return { data, content };
};

module.exports = extractFrontMatter;
