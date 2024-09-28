export const mochaHooks = async(): Promise<any> => {
  console.debug('Mocha global init hook running.');
  return {
    afterAll: () => {
      console.log('Mocha global deinit hook running');
      setTimeout(() => {
        process.exit();
      }, 1000);
    },
  };
};
