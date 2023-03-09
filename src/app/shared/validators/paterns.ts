interface Patterns {
  email: RegExp;
  phone: RegExp;
  nosigns: RegExp;
}

const patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^(?:\+48)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}$/,
  nosigns: /^[a-zA-Z0-9!@#$%^&*()]+$/,
};

export default patterns;
