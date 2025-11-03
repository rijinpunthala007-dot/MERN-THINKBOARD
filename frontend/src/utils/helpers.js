// Helper function to extract username from email
export const getUsernameFromEmail = (email) => {
  if (!email) return 'User';
  const username = email.split('@')[0];
  // Capitalize first letter for nicer display
  return username.charAt(0).toUpperCase() + username.slice(1);
};

