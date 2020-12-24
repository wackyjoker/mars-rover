const regex = new RegExp('^[fblrFBLR]+$', 'g')

const command = (input) => {
    if (!regex.test(input)) {
        console.log("The command string has some invalid input. Please use only 'l', 'r', 'f', or 'b'.");
        return false;
    }
    console.log("successful");
    return true;
}

command("lFFlfl");