import { $ } from "@builder.io/qwik";

/**
 * Generates a random alphanumeric string of a specified length.
 *
 * @param {number} [length=7] - The length of the generated string. Defaults to 7 if not provided.
 * @returns {string} A random alphanumeric string of the specified length.
 */
export const randomId = $((length = 7) =>
  Math.random()
    .toString(36)
    .substring(2, 2 + length)
);
