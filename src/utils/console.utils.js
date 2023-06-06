export const logError = (message) => {
    console.log('\x1b[31m%s\x1b[0m', message);
  };
  
  export const logWarning = (message) => {
    console.log('\x1b[33m%s\x1b[0m', message);
  };
  
  export const logInfo = (message) => {
    console.log('\x1b[36m%s\x1b[0m', message);
  };
  
  export const logSuccess = (message) => {
    console.log('\x1b[32m%s\x1b[0m', message);
  };