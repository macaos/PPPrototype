define(() => {
  var ka;
  var self = {
    initialization: k => {
      ka = k;
      ka.loadView("Main");
    }
  };
  return self;
});
