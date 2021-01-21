class CommonUtils{

    parse(inputString) {
        var args = [].slice.call(arguments, 1),
            i = 0;
    
        return inputString.replace(/%s/g, () => args[i++]);
    }

}

module.exports = new CommonUtils()