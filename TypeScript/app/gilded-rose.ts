export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
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
        this.items.map((item) => {
            const type = this.getItemType(item);

            if (type == 'legendary') return item;

            // Immediately decrease Sellin
            this.decreaseSellin(item);

            if (type === "backstage") {
                this.updateBackstageItem(item);
            } else if (type === "conjured") {
                this.decreaseQuality(item, 2);
            } else if (type === "aged") {
                this.increaseQuality(item);
            } else {
                this.decreaseQuality(item);
            }

            return item;
        });

        return this.items;
    }

    increaseQuality(item: Item, amount = 1) {
        const quality = item.quality + amount;

        if (quality > 50) {
            item.quality = 50;
        } else {
            item.quality = quality;
        }

        return item.quality;
    }

    decreaseQuality(item: Item, amount = 1) {
        const quality = item.quality - amount;

        if (quality < 0) {
            item.quality = 0;
        } else {
            item.quality = quality;
        }

        return item.quality;
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
    }

    getItemType(item: Item) {
        const typeMap = {
            Aged: "aged",
            Normal: "normal",
            Conjured: "conjured",
            Legendary: "legendary",
            Backstage: "backstage",
        }

        if (item.quality === 80) return typeMap.Legendary;

        const splitName = item.name.split(' ');
        const type = splitName[0];

        if (typeMap[type]) {
            return typeMap[type];
        } else {
            return typeMap.Normal;
        }
    }
}
