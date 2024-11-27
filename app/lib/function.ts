export function handleInput({
    input,
    option,
}: {
    input: string;
    option: string;
}): string | Error {
    let safeInput = input.trim();

    if (!safeInput) {
        return new Error("Enter an integer");
    }

    safeInput = safeInput.replace(/[-_,+]/g, "");
    if (safeInput.includes(".")) {
        return new Error("Floats are not allowed, round it off");
    }

    if (isNaN(Number(safeInput))) {
        return new Error(
            "Enter a valid integer or write it in [1-9]e[number] form",
        );
    }

    let calcInput: number;
    if (safeInput.toLowerCase().includes('e')) {
        const [mantissa, exponent] = safeInput.toLowerCase().split('e');
        calcInput = Math.log2(Number(mantissa)) + Number(exponent) * Math.log2(10);
    } else {
        calcInput = Math.log2(Number(safeInput));
    }

    switch (option) {
        case "golang":
            if (calcInput < 0) {
                return new Error("Number must be positive");
            } else if (calcInput < 7) {
                return "int8 or uint8";
            } else if (calcInput < 15) {
                return "int16 or uint16";
            } else if (calcInput < 31) {
                return "int32 or uint32";
            } else if (calcInput < 63) {
                return "int64 or uint64";
            } else {
                return "Use math/big for numbers larger than uint64";
            }
            break;

        case "c":
        case "cpp":
            if (calcInput < 0) {
                return new Error("Number must be positive");
            } else if (calcInput < 7) {
                return "char, unsigned char, or above";
            } else if (calcInput < 8) {
                return "unsigned char or above";
            } else if (calcInput < 15) {
                return "short int, unsigned char, or above";
            } else if (calcInput < 16) {
                return "unsigned short int, or above";
            } else if (calcInput < 31) {
                return "int, unsigned short int, or above";
            } else if (calcInput < 32) {
                return "unsigned int or above";
            } else if (calcInput < 63) {
                return "long long int, unsigned int, or above";
            } else if (calcInput < 64) {
                return "unsigned long long int";
            } else {
                return "unsigned long long int exceeded, use GMP library";
            }
            break;

        case "java":
            if (calcInput < 0) {
                return new Error("Number must be positive");
            } else if (calcInput < 7) {
                return "byte";
            } else if (calcInput < 15) {
                return "short";
            } else if (calcInput < 31) {
                return "int";
            } else if (calcInput < 63) {
                return "long";
            } else {
                return "BigInteger required";
            }
            break;

        case "python":
            return "Python has no integer limits (only limited by available memory)";

        case "javascript":
            if (calcInput < 0) {
                return new Error("Number must be positive");
            } else if (calcInput < 53) {
                return "Number";
            } else {
                return "BigInt required";
            }
            break;

        case "lua":
            if (calcInput < 0) {
                return new Error("Number must be positive");
            } else if (calcInput < 63) {
                return "number (double)";
            } else {
                return "number might lose precision, consider string representation";
            }
            break;

        default:
            return new Error("Unsupported programming language");
    }

    return new Error("Number out of supported range");
}
