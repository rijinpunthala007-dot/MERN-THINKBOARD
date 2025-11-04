/**
 * Advanced helper function to extract a clean, Title-Case username from an email.
 * It handles null/invalid input and converts common separators (., -, _) into spaces,
 * then capitalizes each resulting word (Title Case).
 * * @param {string} email - The user's email address.
 * @returns {string} The Title-Case username, or 'User' as a fallback.
 */
export const getUsernameFromEmail = (email) => {
  // 1. Basic checks for null/undefined/non-string or empty string
  if (typeof email !== 'string' || !email.trim()) {
    return 'User';
  }

  // 2. Extract the part before the '@' symbol
  const parts = email.trim().split('@');
  let username = parts[0].trim();

  // 3. Handle empty usernames
  if (!username) {
    return 'User';
  }

  // 4. Convert common separators (dots, hyphens, underscores) to a single space.
  // This turns 'john.doe_developer' into 'john doe developer'.
  username = username.replace(/[\.\-_]+/g, ' ').toLowerCase();

  // 5. If the string is empty after cleaning (e.g., input was just separator characters), return default
  if (!username.trim() === '') {
    return 'User';
  }

  // 6. Convert to Title Case: Capitalize the first letter of every word
  const titleCaseName = username.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return titleCaseName;
};