class CommonUtils{

    parse(inputString) {
        var args = [].slice.call(arguments, 1),
            i = 0;
    
        return inputString.replace(/%s/g, () => args[i++]);
    }

    getRandomProjectName(){
        const result = Math.random().toString(36).substring(2,7);
        return result;
    }

}

module.exports = new CommonUtils()