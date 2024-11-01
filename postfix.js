// Import readline module
const readline = require('readline');

// Initialize stack
// stack <-- Empty List
const stack = [];

// Initialize a hash map with 26 buckets
// hashMap <-- CREATE ARRAY OF SIZE 26, EACH ELEMENT INITIALIZED TO AN EMPTY LIST
const hashMap = new Array(26).fill(null).map(() => []); 

// FUNCTION Push(item)
function push(item) 
{
    // Add item to the stack
    stack.push(item); //Stack.Push(item)
}
// End FUNCTION

// FUNCTION isEmpty(stack)
function isEmpty(stack) 
{
    // Check if the stack is empty
    // If length of 'stack' is 0, return True, else return False
    return stack.length === 0; // IF stack.length == 0 THEN RETURN True ELSE RETURN False
}
// End Function

// FUNCTION pop()
function pop() 
{
    // Removes and returns the top item from the stack
    // If the stack is not empty, remove and return the top item
    if (!isEmpty(stack)) 
    {
        // IF NOT isEmpty(stack) THEN
        // Remove the last item from 'stack' and return it
        return stack.pop(); // RETURN stack.pop()
    } 
    // ELSE
    else 
    {
        // If the stack is empty, print an error message and return null
        // Print "Stack is empty" and return null
        console.log("Stack is empty"); // PRINT "Stack is empty"
        // Return null
        return null; // RETURN NULL
    }
    // END IF
}
// END FUNCTION

// FUNCTION getValue(key)
function getValue(key) 
{
    // Calculate the hash based on the ASCII value of the key
    // hash <-- ASCII value of key mod 26
    const hash = key.charCodeAt(0) % 26;

    // Search for the key in the bucket
    // entry <-- find entry in hashMap[hash] where entry.key equals key
    const entry = hashMap[hash].find(entry => entry.key === key);

    // IF the key is found THEN
    if (entry) 
    {
        // RETURN the value
        return entry.value;
    } 
    // ELSE
    else 
    {
        // Print a message indicating the variable is not present in the symbol table
        // PRINT `Variable with "${key}" is not present in the symbol table`
        console.log(`Variable with "${key}" is not present in the symbol table`);
        // RETURN null
        return null;
    } // END IF
} // END FUNCTION

// FUNCTION putIntoTable(key, value)
function putIntoTable(key, value) 
{
    // Calculate the hash based on the ASCII value of the key
    // hash <-- ASCII value of key mod 26
    const hash = key.charCodeAt(0) % 26;

    // Search for the key in the bucket
    // existingIndex <-- find index of entry in hashMap[hash] where entry.key equals key
    const existingIndex = hashMap[hash].findIndex(entry => entry.key === key);

    // IF the key is found THEN
    if (existingIndex !== -1) 
    {
        // Update the value at the existing index
        hashMap[hash][existingIndex].value = value; // hashMap[hash][existingIndex].value <-- value
    } 
    // ELSE
    else 
    {
        // Add a new key-value pair to the bucket
        hashMap[hash].push({ key, value }); // hashMap[hash] PUSH { key, value }
    } // END IF
} // END FUNCTION

// FUNCTION to check if 't' is a valid operator
function checkIfValidOperator(t) 
{
    // Define allowed operators
    const allowedOperators = "+-*/%^rl="; // allowedOperators <-- "+-*/%^rl="
    // Return True if 't' is in 'allowedOperators', else return False
    return allowedOperators.includes(t); // IF allowedOperators.includes(t) THEN RETURN True ELSE RETURN False
} // END FUNCTION

// FUNCTION to check if 't' is an integer (including negative numbers)
function IsInteger(t) 
{
    // Return True if 't' matches the regular expression for an integer, including negative numbers
    return /^-?\d+$/.test(t); // IF /^-?\d+$/.test(t) THEN RETURN True ELSE RETURN False
} // END FUNCTION

// FUNCTION to check if 't' is an uppercase letter
function IsUppercaseLetter(t) 
{
    // Return True if 't' matches the regular expression for an uppercase letter, else return False
    return /^[A-Z]$/.test(t); // IF /^[A-Z]$/.test(t) THEN RETURN True ELSE RETURN False
} // END FUNCTION

// FUNCTION to check if 't' is a valid operand
function checkIfValidOperand(t) 
{
    // Return True if 't' is an integer or an uppercase letter, else return False
    return IsInteger(t) || IsUppercaseLetter(t); // IF IsInteger(t) OR IsUppercaseLetter(t) THEN RETURN True ELSE RETURN False
} // END FUNCTION

// FUNCTION to check if the user input is valid
function isInputEnteredValid(userEnter) 
{
    // Split 'userEnter' into 'enteredInputs' by spaces
    const enteredInputs = userEnter.split(/\s+/); // enteredInputs <-- userEnter.split(/\s+/)
    
    for (let i = 0; i < enteredInputs.length; i++) // FOR i from 0 to LENGTH OF enteredInputs DO
    {
        const input = enteredInputs[i]; // input <-- enteredInputs[i]

        // IF NOT checkIfValidOperand(input) AND NOT checkIfValidOperator(input) THEN
        if (!checkIfValidOperand(input) && !checkIfValidOperator(input)) 
        {
            // PRINT "Invalid Input. input is an invalid token."
            console.log(`Invalid Input. ${input} is an invalid token.`);
            return false; // RETURN False
        } // END IF
    } // END FOR

    // If 'enteredInputs' has only one element and it is a valid operand
    // IF enteredInputs.length == 1 AND checkIfValidOperand(enteredInputs[0]) THEN
    if (enteredInputs.length === 1 && checkIfValidOperand(enteredInputs[0])) 
    {
        // Return true
        return true; // RETURN True
    } // END IF

    // Count the number of operands and operators in 'enteredInputs'
    // operandCount <-- count of valid operands in enteredInputs
    const operandCount = enteredInputs.filter(checkIfValidOperand).length; 

    // operatorCount <-- count of valid operators in enteredInputs
    const operatorCount = enteredInputs.filter(checkIfValidOperator).length; 
    
    // If the number of operands is not one more than the number of operators
    // IF operandCount != operatorCount + 1 THEN
    if (operandCount !== operatorCount + 1) 
    { 
        // Print a message and return False
        // PRINT "Invalid Input. The number of operands should be one more than the number of operators."
        console.log("Invalid Input. The number of operands should be one more than the number of operators.");
        // Return false
        return false; // RETURN False
    } // END IF

    // Initialize 'ifNextIsOperand' as True
    let ifNextIsOperand = true; // ifNextIsOperand <-- True
    
    // For each 'input' in 'enteredInputs'
    for (let i = 0; i < enteredInputs.length; i++) // FOR i from 0 to LENGTH OF enteredInputs DO
    { 
        const input = enteredInputs[i]; // input <-- enteredInputs[i]
        
        // If 'ifNextIsOperand' is True
        if (ifNextIsOperand) // IF ifNextIsOperand THEN
        { 
            // If 'input' is not a valid operand
            if (!checkIfValidOperand(input)) // IF NOT checkIfValidOperand(input) THEN
            { 
                // Set 'ifNextIsOperand' as False
                ifNextIsOperand = false; // ifNextIsOperand <-- False
            } // END IF
        }
        // ELSE 
        else 
        {
            // If 'input' is not a valid operator
            if (!checkIfValidOperator(input)) // IF NOT checkIfValidOperator(input) THEN
            { 
                // Print a message and return False
                // PRINT "Invalid Input. Please enter operands before operators."
                console.log("Invalid Input. Please enter operands before operators."); 
                // Return false
                return false; // RETURN False
            } // END IF
        } // END IF
    } // END FOR
    // Return true
    return true; // RETURN True
} // END FUNCTION

// FUNCTION to perform operations based on the operator and operands
function performOperations(operator, operand1, operand2) 
{
    // If 'operand1' is an uppercase letter
    if (IsUppercaseLetter(operand1)) // IF IsUppercaseLetter(operand1) THEN
    { 
        // Get the value of 'operand1' from the symbol table
        operand1 = getValue(operand1); // operand1 <-- getValue(operand1)
        // If 'operand1' is null
        if (operand1 === null) // IF operand1 == NULL THEN
        { 
            // Return null
            return null; // RETURN NULL
        } // END IF
    } // END IF

    // If 'operand2' is an uppercase letter
    if (IsUppercaseLetter(operand2)) // IF IsUppercaseLetter(operand2) THEN
    { 
        // Get the value of 'operand2' from the symbol table
        operand2 = getValue(operand2); // operand2 <-- getValue(operand2)
        // If 'operand2' is null
        if (operand2 === null) // IF operand2 == NULL THEN
        { 
            // Return null
            return null; // RETURN NULL
        } // END IF
    } // END IF

    // Convert 'operand1' and 'operand2' to floating point numbers
    const num1 = parseFloat(operand1); // num1 <-- parseFloat(operand1)
    const num2 = parseFloat(operand2); // num2 <-- parseFloat(operand2)

    /* Half of case code taken from:
        https://github.com/iMinion/Workspace/blob/6174cf14756010df2e2c10b72e9a8720e41b5c51/ADS2/InFix.java
        and
        https://github.com/GoldMane01/CalculadoraED/blob/da91c76eb9b21eb74eb2d9cf463f1acb65d1566b/CalculadoraED/src/main/java/com/mycompany/calculadoraed/Calculadora.java
    */
    // Perform the operation based on 'operator'
    switch (operator) // SWITCH operator
    { 
        case '+': // CASE '+'
            return num1 + num2; // RETURN num1 + num2
        case '-': // CASE '-'
            return num1 - num2; // RETURN num1 - num2
        case '*': // CASE '*'
            return num1 * num2; // RETURN num1 * num2
        case '/': // CASE '/'
            return num1 / num2; // RETURN num1 / num2
        case '%': // CASE '%'
            return num1 % num2; // RETURN num1 % num2
        case '^': // CASE '^'
            return Math.pow(num1, num2); // RETURN num1 ^ num2
        case 'r': // CASE 'r'
            return Math.pow(num2, 1 / num1); // RETURN num2 ^ (1 / num1)
        case 'l': // CASE 'l'
            return Math.log(num1) / Math.log(num2); // RETURN log(num1) / log(num2)
        default: // DEFAULT
            // Print a message and return null
            console.log("Invalid operator. Please check input."); // PRINT "Invalid operator. Please check input."
            return null; // RETURN NULL
    } // END SWITCH
} // END FUNCTION
 
// FUNCTION to evaluate postfix arithmetic expressions
function evaluatePostfixArithmetic(postfixTokens) 
{
    // Split 'postfixTokens' into 'tokenArray' by spaces
    const tokenArray = postfixTokens.split(/\s+/); // tokenArray <-- postfixTokens.split(/\s+/)
   
    // FOR EACH token in tokenArray DO
    for (const token of tokenArray) // for (const token of tokenArray)
    { 
        // If 'token' is a valid operand
        if (checkIfValidOperand(token)) // IF checkIfValidOperand(token) THEN
        { 
            // Push 'token' to the stack
            push(token); // push(token)
        } 
        // Else if 'token' is a valid operator
        else if (checkIfValidOperator(token)) // ELSE IF checkIfValidOperator(token) THEN
        { 
            // Trim 'token' and assign it to 'operator'
            const operator = token.trim(); // operator <-- token.trim()

            // If the stack has less than 2 elements
            if (stack.length < 2) // IF stack.length < 2 THEN
            {
               // Print a message and return
               // PRINT "Invalid input. Not enough operands for the operator."
               console.log("Invalid input. Not enough operands for the operator."); 
                return; // RETURN
            } // END IF
            // Pop two elements from the stack and assign them to 'operand2' and 'operand1'
            const operand2 = pop(); // operand2 <-- pop()
            const operand1 = pop(); // operand1 <-- pop()
            
            // If 'operator' is '='
            if (operator === '=') // IF operator == '=' THEN
            {
                // If 'operand1' is an uppercase letter
                if (IsUppercaseLetter(operand1)) // IF IsUppercaseLetter(operand1) THEN
                {
                    // If 'operand2' is an uppercase letter and it is not present in the symbol table
                    // IF IsUppercaseLetter(operand2) THEN
                    if (IsUppercaseLetter(operand2)) 
                    { 
                        // Print a message and return
                        // PRINT `The symbol table does not contain the variable operand2.`
                        console.log(`The symbol table does not contain the variable ${operand2}.`);
                        return; // RETURN
                    } // END IF
                    // Put 'operand1' and 'operand2' into the symbol table
                    putIntoTable(operand1, operand2); // putIntoTable(operand1, operand2)
                    // Print a message
                    console.log(`${operand1} = ${operand2}`); // PRINT `${operand1} = ${operand2}`
                } 
                // ELSE
                else 
                { 
                     // Print a message
                     // PRINT `Error: Invalid assignment. operand1 is an invalid variable.`
                    console.log(`Error: Invalid assignment. ${operand1} is an invalid variable.`); 
                } // END IF
            } 
            // ELSE
            else 
            { 
                // Perform the operation based on 'operator', 'operand1', & 'operand2' & assign the result to 'result'
                // result <-- performOperations(operator, operand1, operand2)
                const result = performOperations(operator, operand1, operand2); 
                // If 'result' is not null
                if (result !== null) // IF result != NULL THEN
                { 
                    // Push the string representation of 'result' to the stack
                    push(result.toString()); // push(result.toString())
                } 
                // ELSE
                else 
                { 
                    // Return
                    return; // RETURN
                } // END IF
            } // END IF
        } // END IF
    } // END FOR

    // If the stack has exactly 1 element
    if (stack.length === 1) // IF stack.length == 1 THEN
    { 
        // Pop an element from the stack, convert it to a floating point number, and assign it to 'output'
        const output = parseFloat(pop()); // output <-- parseFloat(pop())
        // Print a message
        console.log(`result = [${output}]`); // PRINT `result = [${output}]`
    } 
    // Else if the stack has more than 1 element
    else if (stack.length > 1) // ELSE IF stack.length > 1 THEN
    { 
        // Print a message
        console.log("Invalid input. Please try again."); // PRINT "Invalid input. Please try again."
    } // END IF

} // END FUNCTION

 
// Create a readline interface 'rl' with process.stdin as input and process.stdout as output
/*Got this code from: https://github.coventry.ac.uk/kearj/foundation/commit/9f071fd784c0f15bc9be544d8b0ba62f8cef77a1?diff=split */
const rl = readline.createInterface( // rl <-- readline.createInterface
{
    input: process.stdin, // input <-- process.stdin
    output: process.stdout // output <-- process.stdout
});


/* made the table form by using characters from https://github.com/hgmiguel/practices/blob/dd515ff71462c25fe197d59a569ecf4ea62f5b50/hugo/hgmiguel/content/post/s3_lab.md */
// Print the table
console.log("                 ** Postfix++ Interpreter (Dictionary for users) ** ");
console.log("┌─────────────────┬────────┬────────────────────────────────────────────────────┐");
console.log("| Operation       | Symbol | Example                                            |");
console.log("|-----------------|--------|----------------------------------------------------|");
console.log("| Assignment      | =      | 'A 3 =' assigns the value 3 to variable A          |");
console.log("| Addition        | +      | 'x y +' means x + y                                |");
console.log("| Subtraction     | -      | 'x y -' means x - y                                |");
console.log("| Multiplication  | *      | 'x y *' means x * y                                |");
console.log("| Division        | /      | 'x y /' means x / y                                |");
console.log("| Modulus         | %      | 'x y %' means x % y                                |");
console.log("| Power           | ^      | 'x y ^' means x raised to the power of y           |");
console.log("| Root            | r      | 'x y r' means the root of x to the degree of y     |");
console.log("| Logarithm       | l      | 'x y l' means the log of y with x as the base      |");
console.log("└─────────────────┴────────┴────────────────────────────────────────────────────┘");

// FUNCTION to get user input and evaluate it
function getInput() 
{
    // Ask the user to enter input
    rl.question(" Enter: ", (userEnter) => // PRINT " Enter: "
    { 
        // If the user input is valid
        if (isInputEnteredValid(userEnter)) // IF isInputEnteredValid(userEnter) THEN
        { 
            // Evaluate the postfix arithmetic expression in the user input
            evaluatePostfixArithmetic(userEnter); // evaluatePostfixArithmetic(userEnter)
            // If the stack has exactly 1 element
            if (stack.length === 1) // IF stack.length == 1 THEN
            { 
                // Pop an element from the stack and convert it to a floating point number
                parseFloat(pop()); // parseFloat(pop())
            } 
            // Else if the stack has more than 1 element
            else if (stack.length > 1) // ELSE IF stack.length > 1 THEN
            { 
                // Print a message
                console.log("Invalid input. Please try again."); // PRINT "Invalid input. Please try again."
            } // END IF
        } // END IF
        // Get user input again
        getInput(); // getInput()
    }); // END FUNCTION
} // END FUNCTION

// Call the 'getInput' function
getInput(); // getInput()
