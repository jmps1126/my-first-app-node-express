function info(text: string): string {
  console.log('INFO:', text);
  return text;
}

function error(text: string): string {
  console.log('ERROR:', text);
  return text;
}

export { info, error };
