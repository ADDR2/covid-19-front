Number.prototype.applyComas = function() {
    const stringifiedNumber = String(this);
    let counter = 0;
    let result = '';

    for(let index = stringifiedNumber.length - 1; index > 0; index--) {
        counter++;

        !(counter%3) && (result = ',' + stringifiedNumber[index] + result);
        counter%3 && (result = stringifiedNumber[index] + result);
    }

    result = stringifiedNumber[0] + result
    return result;
};