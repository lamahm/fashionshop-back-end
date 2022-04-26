module.exports = {
    capitalize: userName => {
        const name = userName.toLowerCase();
        return name.charAt(0).toUpperCase()
        + name.slice(1);
    }
}