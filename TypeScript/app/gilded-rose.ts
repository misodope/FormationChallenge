export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateItems() {
        return this.items.map((item) => this.updateItem(item));
    }

    increaseQuality(item: Item, amount = 1) {
        const MAX_QUALITY = 50;
        const quality = item.quality + amount;

        item.quality = quality > MAX_QUALITY ? MAX_QUALITY : quality;

        return item;
    }

    decreaseQuality(item: Item, amount = 1) {
        const MIN_QUALITY = 0;
        const quality = item.quality - amount;

        item.quality = quality < MIN_QUALITY ? MIN_QUALITY : quality

        return item;
    }

    decreaseSellin(item: Item) {
        item.sellIn = item.sellIn - 1;

        return item.sellIn;
    }

    updateBackstageItem(item: Item) {
        if (item.sellIn < 0) {
            this.decreaseQuality(item, item.quality);
        } else if (item.sellIn > 5 && item.sellIn <= 10) {
            // Quality increased 2x if sellin is greater than 5 and <= 10
            this.increaseQuality(item, 2);
        } else if (item.sellIn <= 5) {
            this.increaseQuality(item, 3);
        } else {
            this.increaseQuality(item);
        }

        return item;
    }

    updateItem(item: Item) {
        interface TypeMap {
            [key: string]: () => Item;
        }

        const typeMap: TypeMap = {
            Aged: () => this.increaseQuality(item),
            Backstage: () => this.updateBackstageItem(item),
            Conjured: () => this.decreaseQuality(item, 2),
            Legendary: () => item,
            Normal: () => this.decreaseQuality(item),
        }

        // Legendary items can only be determined by Quality of 80
        if (item.quality === 80) return typeMap.Legendary();

        // Always decrease sellin
        this.decreaseSellin(item);

        // Determine item type by String name.
        const splitName = item.name.split(' ');
        const selectedType = splitName[0];

        if (typeMap[selectedType]) return typeMap[selectedType]()

        return typeMap.Normal()
    }
}
