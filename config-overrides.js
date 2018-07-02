module.exports = function override(config, env) {

  // Uncomment this code if you want to dump the contents of the webpack config
  // into the console when you run 'npm start'
  
  // console.log(JSON.stringify(config, null, 2));
  // while(true) {
  //   var a = 1;
  // }

  config.module.rules[1].oneOf[2].use.unshift({
    loader: require.resolve("babel-loader")
  });

  return config;
};
