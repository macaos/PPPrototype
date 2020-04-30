var kuproductList = [
  {
    publicName: "navigation-04",
    price: 1.99,
    category1: "component",
    category2: "navigation",
    iframewh: ["100%", "800px"],
    ppid: "ZHEL2VAZJLRA2"
  },
  {
    publicName: "list-order-01",
    price: 1.99,
    category1: "component",
    category2: "list",
    iframewh: ["100%", "800px"],
    ppid: "ZHEL2VAZJLRA2"
  },
  {
    publicName: "tabs-02",
    price: 1.99,
    category1: "component",
    category2: "tabs",
    iframewh: ["100%", "800px"],
    ppid: "ZHEL2VAZJLRA2"
  },
  {
    publicName: "accordion-01",
    price: 1.99,
    category1: "component",
    category2: "accordion",
    iframewh: ["100%", "500px"],
    ppid: "RNW22HXN7PN2C"
  },
  {
    publicName: "template-04",
    price: 1.99,
    category1: "component",
    category2: "template",
    iframewh: ["100%", "800px"],
    ppid: "PXVLQXM4BPR7C"
  },
  {
    publicName: "dropdown-01",
    price: 1.99,
    category1: "component",
    category2: "dropdown",
    iframewh: ["100%", "500px"],
    ppid: "4SJBU3RRSSGGL"
  },
  {
    publicName: "navigation-01",
    price: 1.99,
    category1: "component",
    category2: "navigation",
    iframewh: ["100%", "800px"],
    ppid: "J86Q9TBLH42LG"
  },
  {
    publicName: "calendar-01",
    price: 0.99,
    category1: "component",
    category2: "calendar",
    iframewh: ["100%", "800px"],
    ppid: "AC9UUFT6Q6PU6"
  },
  {
    publicName: "dropdown-02",
    price: 1.15,
    category1: "component",
    category2: "dropdown",
    iframewh: ["100%", "500px"],
    ppid: "SWESPET22UHDA"
  },
  {
    publicName: "navigation-02",
    price: 1.99,
    category1: "component",
    category2: "dropdown",
    iframewh: ["100%", "500px"],
    ppid: "MKCCT65US3U3G"
  },
  {
    publicName: "navigation-03",
    price: 1.99,
    category1: "component",
    category2: "dropdown",
    iframewh: ["100%", "500px"],
    ppid: "27JAAF4RPZF7Q"
  },
  {
    publicName: "popover-01",
    price: 1.25,
    category1: "component",
    category2: "dropdown",
    iframewh: ["100%", "500px"],
    ppid: "JQP2L78V445D6"
  },
  {
    publicName: "template-01",
    price: 0.99,
    category1: "component",
    category2: "dropdown",
    iframewh: ["100%", "800px"],
    ppid: "RD53C7NCEHRW4"
  },
  {
    publicName: "template-02",
    price: 0.99,
    category1: "component",
    category2: "dropdown",
    iframewh: ["100%", "800px"],
    ppid: "3VFZM5MYHQVSQ"
  },
  {
    publicName: "accordion-02",
    price: 1.99,
    category1: "component",
    category2: "dropdown",
    iframewh: ["100%", "800px"],
    ppid: "7AP4ZJBLT4THJ"
  },
  {
    publicName: "tabs-01",
    price: 1.99,
    category1: "component",
    category2: "dropdown",
    iframewh: ["100%", "800px"],
    ppid: "3UW63UUZP6AJJ"
  }
];

function getKuproductInfo(pid) {
  let r = null;
  $.each(kuproductList, function(i, item) {
    if (item.publicName == pid) {
      r = item;
      return false;
    }
  });
  return r;
}
