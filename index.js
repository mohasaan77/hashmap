import { HashMap } from './script.js';

// Make sure your HashMap class is imported or available here.

const test = new HashMap();

// 1. Populate the HashMap with 12 entries
console.log('===== 1. INITIAL POPULATION =====');

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log('Length:', test.length()); // 12
console.log('Capacity:', test.capacity); // 16
console.log('Load:', test.length() / test.capacity); // 0.75
console.log('Buckets:', test.buckets);

// 2. Update existing entries (should NOT resize)
console.log('\n===== 2. UPDATE EXISTING ENTRIES =====');

test.set('apple', 'green');
test.set('banana', 'gold');
test.set('dog', 'black');

console.log('Apple:', test.get('apple')); // green
console.log('Banana:', test.get('banana')); // gold
console.log('Dog:', test.get('dog')); // black

console.log('Length:', test.length()); // 12
console.log('Capacity:', test.capacity); // 16

// 3. Add 13th entry (should trigger resizing)
console.log('\n===== 3. RESIZING =====');

test.set('moon', 'silver');

console.log('Length:', test.length()); // 13
console.log('Capacity:', test.capacity); // 32
console.log('Load:', test.length() / test.capacity); // 0.40625
console.log('Buckets after resize:', test.buckets);

// 4. Update entries after resizing
console.log('\n===== 4. UPDATE AFTER RESIZING =====');

test.set('moon', 'white');
test.set('elephant', 'dark gray');

console.log('Moon:', test.get('moon')); // white
console.log('Elephant:', test.get('elephant')); // dark gray

console.log('Length:', test.length()); // 13
console.log('Capacity:', test.capacity); // 32

// 5. Test get()
console.log('\n===== 5. GET =====');

console.log(test.get('apple')); // green
console.log(test.get('frog')); // green
console.log(test.get('moon')); // white
console.log(test.get('lion')); // golden
console.log(test.get('unknown')); // undefined

// 6. Test has()
console.log('\n===== 6. HAS =====');

console.log(test.has('apple')); // true
console.log(test.has('moon')); // true
console.log(test.has('banana')); // true
console.log(test.has('unknown')); // false
console.log(test.has('')); // false

// 7. Test keys()
console.log('\n===== 7. KEYS =====');

console.log(test.keys()); // Array of 13 keys
console.log('Number of keys:', test.keys().length); // 13

// 8. Test values()
console.log('\n===== 8. VALUES =====');

console.log(test.values()); // Array of 13 values
console.log('Number of values:', test.values().length); // 13

// 9. Test entries()
console.log('\n===== 9. ENTRIES =====');

console.log(test.entries()); // Array of 13 key-value pairs
console.log('Number of entries:', test.entries().length); // 13

// 10. Test remove()
console.log('\n===== 10. REMOVE =====');

console.log(test.remove('apple')); // true
console.log(test.remove('moon')); // true
console.log(test.remove('unknown')); // false

console.log('Apple exists:', test.has('apple')); // false
console.log('Moon exists:', test.has('moon')); // false
console.log('Length:', test.length()); // 11
console.log('Capacity:', test.capacity); // 32

// 11. Test collisions
console.log('\n===== 11. COLLISIONS =====');

// These two single-character keys hash to the same
// bucket when capacity is 32.
console.log('Hash of a:', test.hash('a')); // 1
console.log('Hash of A:', test.hash('A')); // 1

test.set('a', 'lowercase');
test.set('A', 'uppercase');

console.log(test.get('a')); // lowercase
console.log(test.get('A')); // uppercase
console.log('Length:', test.length()); // 13

// Remove one colliding key
console.log(test.remove('a')); // true
console.log(test.get('A')); // uppercase
console.log(test.has('a')); // false
console.log('Length:', test.length()); // 12

// 12. Test undefined values
console.log('\n===== 12. UNDEFINED VALUES =====');

test.set('empty', undefined);

console.log(test.has('empty')); // true
console.log(test.get('empty')); // undefined
console.log(test.length()); // 13

test.remove('empty');

// 13. Test clear()
console.log('\n===== 13. CLEAR =====');

test.clear();

console.log('Length:', test.length()); // 0
console.log('Keys:', test.keys()); // []
console.log('Values:', test.values()); // []
console.log('Entries:', test.entries()); // []
console.log('Capacity:', test.capacity); // 32

// 14. Test inserting after clear()
console.log('\n===== 14. INSERT AFTER CLEAR =====');

test.set('new', 'value');

console.log(test.get('new')); // value
console.log(test.length()); // 1
console.log(test.has('new')); // true

// 15. Test multiple resizes
console.log('\n===== 15. MULTIPLE RESIZES =====');

const growthTest = new HashMap();

for (let i = 0; i < 50; i++) {
  growthTest.set(`key${i}`, `value${i}`);
}

console.log('Length:', growthTest.length()); // 50
console.log('Capacity:', growthTest.capacity); // 128
console.log('First entry:', growthTest.get('key0')); // value0
console.log('Last entry:', growthTest.get('key49')); // value49
console.log('All entries:', growthTest.entries());
