import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([
            new Item('foo', 30, 1),
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
            new Item("Sulfuras, Hand of Ragnaros", -1, 80),
            new Item("Aged Brie", 2, 0),
            new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
            new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40),
            new Item("Conjured Mana Cake", 3, 6),
        ]);

        const mockData = [
            new Item('foo', 29, 0), // sellin 29, quality 0
            new Item('Backstage passes to a TAFKAL80ETC concert', 4, 13), // quality 13
            new Item("Sulfuras, Hand of Ragnaros", -1, 80),
            new Item("Aged Brie", 1, 1),
            new Item("Backstage passes to a TAFKAL80ETC concert", 14, 21),
            new Item("Backstage passes to a TAFKAL80ETC concert", 9, 50),
            new Item("Backstage passes to a TAFKAL80ETC concert", 4, 50),
            new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0),
            new Item("Conjured Mana Cake", 2, 4),
        ];

        const items = gildedRose.updateItems();

        expect(items).to.deep.equal(mockData);
    });
});
