"use strict";
exports.__esModule = true;
var conf_1 = require("conf");
// const store = new Store({
//     defaults: {
//         pos: {
//             x: 0,
//             y: 0,
//         },
//         size: {
//             width: 800,
//             height: 600,
//         },
//     },
// });
// const { x, y } = store.get('pos');
// console.log(x);
// const { x: x2, y: y2, width: width2 } = store.get('notExist');
var storeNoWorky = new conf_1["default"]({
    // defaults: {
    //     pos: {
    //         x: 0,
    //         y: 0,
    //     },
    //     size: {
    //         width: 800,
    //         height: 600,
    //     },
    // },
    schema: {
        pos: {
            type: 'object',
            properties: {
                x: {
                    type: 'number',
                    "default": 0
                },
                y: {
                    type: 'number',
                    "default": 0
                }
            },
            "default": {}
        },
        size: {
            type: 'object',
            properties: {
                width: {
                    type: 'number'
                },
                height: {
                    type: 'number'
                }
            }
        }
    }
});
console.log(storeNoWorky.get('pos'));
