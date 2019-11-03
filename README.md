# WordsQ
Small site, used to train and learn words from new language. Created using DnaWeb:  http://dnaweb.io/ 



## Usage

All of your words should be saved in javascript file ***/WebRoot/Assets/Js/wordsq.lections.js*** as javascript array.

In that file you should create one more array which contains all of the lections as arrays in it. Example:
```javascript
let lection1 = [
	"WordInYourLanguage$Der$WordInTheOtherLanguage",
	.
	.
];

let allLections = [
	lection1
];

let addition1 = [
	"WordInYourLanguage$Der$WordInTheOtherLanguage",
	.
	.
];

let allAdditions = [
	addition1
];
```

Website was intentionally designed for German words so the prefixes are also included. If you want to use it for another language simply set the container with the selection as hidden in the HTML. But the option for toggling the visibility should be added soon. In case of the prefixes, if you want to use this, make sure that you use only these prefixes: **Der, Die, Das, None**. website understands only these. If you don't want to use them put everywhere **None**.

As you may noticed you can specify additions. These are groups of words that are additional to the main ones. This option is basically only for better organization.

Format of the words is using ***$*** as separator. When you are writing words you may do that in something like MS Excel and add separators them in another column.

**And make sure that  the lists called ```allLections``` and ```allAdditions``` are created cause the website cares only about those two**



## Customization

If you want to add more lections or additions than are available in the website already, or maybe change the titles from "Lection1" to something else, you will have to edit the HTML located in ***Source/Html/index.dhtml*** if you don't use DnaWeb you will have to edit the raw html file in ***WebRoot/index.html***.

For adding new lections or additions you will have to add this code:
```html
<label class="container">Lection 1
    <input id="lection1" type="checkbox" >
    <span class="checkmark"></span>
</label>
```

You can replace the "Lection 1" text in the first line for whatever you want, but **make sure that the id for input matches exactly with the lection or addition you want this checkbox to correspond to. If it is lection you have to make the id ```lection``` and then the order number of the correct lection you want this to correspond to . For additions just replace the word "lection" with "addition" and adjust the number appropriately.**

For example, if my ***wordsq.lections.js*** file looked like this:
```javascript
let someLection = [
	"A$B$C"
];

let someOtherLection = [
	"D$E$F"
];

// Must be called "allLections"
let allLections = [
	someLection,
	someOtherLection
];
```

Now, if I want my checkbox to correspond to e.g. ```someLection``` from the file, I can make the name whatever I want, but the Id of the checkbox must be ```lection1``` cause it is the first entry on the ```allLections``` array.

***In the ```index``` html file you will find ```div``` which has comment inside saying "Start of lection list" and near the end it will have comment saying "End of lection list". Between these two comments you should add all the lection buttons using the html code listed before.***



## License

This is open source free to use project, feel free to use, modify, change it.