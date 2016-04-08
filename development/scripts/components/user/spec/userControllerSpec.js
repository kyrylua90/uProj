describe('userController spec', function() {
  
  describe('hashFactory', function () {
    var hashFactory;

    beforeEach(module('uProject.user'));
    beforeEach(inject(function(_hashFactory_) {
      hashFactory = _hashFactory_;
    }));
    
    it('should return 8 chars hash for string', function() {
      var hash = hashFactory('test');

      expect(hash).toBeDefined();
      expect(hash.length).toBe(8);
      expect(hashFactory('teststring').length).toBe(8);
    });

    it('should return the same hash for the same string', function() {
      expect(hashFactory('test')).toBe(hashFactory('test'));
    });

    it('should return zero for empty string', function() {
      expect(hashFactory('')).toEqual(0);
    });
    
  });

});