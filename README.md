# Calculator

[Task](https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0#heading=h.5dt3hghpa22f)

This app provides a calculator, which can execute simple operations, such as: addition, subtraction, multiplication, division. Also is supports percentage count, sign change and theme change.

## How to run

Instructions:

1. Copy project by using `https://github.com/Lis1459/Calculator.git` or by downloading zip.
2. Then open its folder in console `cd destination_folder`.
3. Run the command `npm run build`.
4. After that the folder **dist** will appear.
5. Finally, all you need is run _index.html_ file and enjoy the app.

## Folders' content

In a source (src) folder there are some folders, that are responsible for their tasks:

- **controller** - a folder which contains _handlers.js_ which provides main handlers for buttons.
- **logic** - contains 2 files: _operations.js_ - exports mathematical operations, _calculate.js_ - exports function, that use a certain operation depends on recieved operator.
- **ui** - contains _display.js_, that exports functions for calculator display update.
- **styles** - contains _main.css_, that provides styles for an app.

## Demo

Live demo: https://lis1459.github.io/Calculator/

## Authors

This project was created by Evgeniy Lupach.
