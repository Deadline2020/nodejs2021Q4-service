import bcrypt from 'bcrypt';


/**
 * The function generate hash from password
 *
 * @param password - user password
 * @returns The generated hash
 */
const getHash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export default getHash;
