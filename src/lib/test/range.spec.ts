import { Range } from '../range';

describe('Range', () => {
  let range: Range;

  beforeEach(() => {
    range = new Range(228, 322);
  });

  it('should set min property', () => {
    expect(range.min).toBe(228);
  });

  it('should set max property', () => {
    expect(range.max).toBe(322);
  });

  describe('#add', () => {
    beforeEach(() => {
      range.add(5);
    });

    it('should add 5 to min property', () => {
      expect(range.min).toBe(233);
    });


    it('should add 5 to max property', () => {
      expect(range.max).toBe(327);
    });
  });

  describe('#subtract', () => {
    beforeEach(() => {
      range.subtract(5);
    });

    it('should subtract 5 from min property', () => {
      expect(range.min).toBe(223);
    });


    it('should subtract 5 from max property', () => {
      expect(range.max).toBe(317);
    });
  });

  describe('#multiply', () => {
    beforeEach(() => {
      range.multiply(5);
    });

    it('should multiply min property by 5', () => {
      expect(range.min).toBe(1140);
    });


    it('should multiply max property by 5', () => {
      expect(range.max).toBe(1610);
    });
  });

  describe('#divide', () => {
    beforeEach(() => {
      range.divide(2);
    });

    it('should divide min property by 2', () => {
      expect(range.min).toBe(114);
    });


    it('should divide max property by 2', () => {
      expect(range.max).toBe(161);
    });
  });

  describe('#includes', () => {
    it('should return true for 250', () => {
      expect(range.includes(250)).toBe(true);
    });

    it('should return false for 150', () => {
      expect(range.includes(150)).toBe(false);
    });

    it('should return false for 228', () => {
      expect(range.includes(228)).toBe(true);
    });

    it('should return false for 322', () => {
      expect(range.includes(322)).toBe(true);
    });
  });

  describe('#reduce', () => {
    describe('the range is positive', () => {
      beforeEach(() => {
        range = new Range(100, 120);
      });

      describe('within', () => {
        it('should return 100 for input 100', () => {
          expect(range.reduce(100)).toBe(100);
        });

        it('should return 120 for input 120', () => {
          expect(range.reduce(120)).toBe(120);
        });

        it('should return 115 for input 115', () => {
          expect(range.reduce(115)).toBe(115);
        });
      });

      describe('above', () => {
        it('should return 105 for input 125', () => {
          expect(range.reduce(125)).toBe(105);
        });

        it('should return 115 for input 175', () => {
          expect(range.reduce(175)).toBe(115);
        });
      });

      describe('below', () => {
        it('should return 115 for input 95', () => {
          expect(range.reduce(95)).toBe(115);
        });

        it('should return 115 for input 35', () => {
          expect(range.reduce(35)).toBe(115);
        });
      });
    });

    describe('the range is in the middle', () => {
      beforeEach(() => {
        range = new Range(-20, 20);
      });

      describe('within', () => {
        it('should return -20 for input -20', () => {
          expect(range.reduce(-20)).toBe(-20);
        });

        it('should return 20 for input 20', () => {
          expect(range.reduce(20)).toBe(20);
        });

        it('should return 0 for input 0', () => {
          expect(range.reduce(0)).toBe(0);
        });
      });

      describe('above', () => {
        it('should return -5 for input 35', () => {
          expect(range.reduce(35)).toBe(-5);
        });

        it('should return 15 for input 95', () => {
          expect(range.reduce(95)).toBe(15);
        });
      });

      describe('below', () => {
        it('should return 5 for input -35', () => {
          expect(range.reduce(-35)).toBe(5);
        });

        it('should return -15 for input -95', () => {
          expect(range.reduce(-95)).toBe(-15);
        });
      });
    });

    describe('the range is negative', () => {
      beforeEach(() => {
        range = new Range(-40, -20);
      });

      describe('within', () => {
        it('should return -40 for input -40', () => {
          expect(range.reduce(-40)).toBe(-40);
        });

        it('should return -20 for input -20', () => {
          expect(range.reduce(-20)).toBe(-20);
        });

        it('should return -30 for input -30', () => {
          expect(range.reduce(-30)).toBe(-30);
        });
      });

      describe('above', () => {
        it('should return -35 for input -15', () => {
          expect(range.reduce(-15)).toBe(-35);
        });

        it('should return -25 for input 55', () => {
          expect(range.reduce(55)).toBe(-25);
        });
      });

      describe('below', () => {
        it('should return -35 for input -55', () => {
          expect(range.reduce(-55)).toBe(-35);
        });

        it('should return -35 for input -115', () => {
          expect(range.reduce(-115)).toBe(-35);
        });
      });
    });
  });

  describe('#Range:getRange', () => {
    beforeEach(() => {
      range = Range.getRange(-322, -228);
    });

    it('should return an instance of a Range class', () => {
      expect(range).toBeInstanceOf(Range);
    });

    it('should set min property properly', () => {
      expect(range.min).toBe(-322);
    });

    it('should set max property properly', () => {
      expect(range.max).toBe(-228);
    });
  });
});
