const validatePhone = (num: string) => {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(num);
};
export {validatePhone};
