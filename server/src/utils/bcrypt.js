import bcrypt from "bcryptjs";

export const hashData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

export const compareHashData = async (data,hashData) => {
  return await bcrypt.compare(data,hashData);
};


