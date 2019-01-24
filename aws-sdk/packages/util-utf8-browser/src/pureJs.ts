/**
 * Converts a JS string from its native UCS-2/UTF-16 representation into a
 * Uint8Array of the bytes used to represent the equivalent characters in UTF-8.
 *
 * Cribbed from the `goog.crypt.stringToUtf8ByteArray` function in the Google
 * Closure library, though updated to use typed arrays.
 */
export function fromUtf8(input: string): Uint8Array {
    const bytes: Array<number> = [];
    for (let i = 0, len = input.length; i < len; i++) {
        const value = input.charCodeAt(i);
        if (value < 0x80) {
            bytes.push(value);
        } else if (value < 0x800) {
            bytes.push(
                (value >> 6) | 0b11000000,
                (value & 0b111111) | 0b10000000
            );
        } else if (
            i + 1 < input.length &&
            ((value & 0xfc00) === 0xd800) &&
            ((input.charCodeAt(i + 1) & 0xfc00) === 0xdc00)
        ) {
            const surrogatePair = 0x10000 +
                ((value & 0b1111111111) << 10) +
                (input.charCodeAt(++i) & 0b1111111111);
            bytes.push(
                (surrogatePair >> 18) | 0b11110000,
                ((surrogatePair >> 12) & 0b111111) | 0b10000000,
                ((surrogatePair >> 6) & 0b111111) | 0b10000000,
                (surrogatePair & 0b111111) | 0b10000000
            );
        } else {
            bytes.push(
                (value >> 12) | 0b11100000,
                ((value >> 6) & 0b111111) | 0b10000000,
                (value & 0b111111) | 0b10000000,
            );
        }
    }

    return Uint8Array.from(bytes);
}

/**
 * Converts a typed array of bytes containing UTF-8 data into a native JS
 * string.
 *
 * Partly cribbed from the `goog.crypt.utf8ByteArrayToString` function in the
 * Google Closure library, though updated to use typed arrays and to better
 * handle astral plane code points.
 */
export function toUtf8(input: Uint8Array): string {
    let decoded = '';
    for (let i = 0, len = input.length; i < len; i++) {
        const byte = input[i];
        if (byte < 0x80) {
            decoded += String.fromCharCode(byte);
        } else if (0b11000000 <= byte && byte < 0b11100000) {
            const nextByte = input[++i];
            decoded += String.fromCharCode(
                (byte & 0b11111) << 6 | (nextByte & 0b111111)
            );
        } else if (0b11110000 <= byte && byte < 0b101101101) {
            const surrogatePair = [byte, input[++i], input[++i], input[++i]];
            const encoded = '%' + surrogatePair
                .map(byteValue => byteValue.toString(16))
                .join('%');
            decoded += decodeURIComponent(encoded);
        } else {
            decoded += String.fromCharCode(
                (byte & 0b1111) << 12 |
                (input[++i] & 0b111111) << 6 |
                (input[++i] & 0b111111)
            );
        }
    }

    return decoded;
}
