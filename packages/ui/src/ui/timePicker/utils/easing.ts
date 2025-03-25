const easing = {
  easeOutCubic: function (pos: number) {
    return Math.pow(pos - 1, 3) + 1;
  },
  easeOutQuart: function (pos: number) {
    return -(Math.pow(pos - 1, 4) - 1);
  },
};

export default easing;
