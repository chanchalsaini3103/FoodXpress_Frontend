// ✅ Correct
import { jwtDecode } from "jwt-decode";

export function getRoleFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch {
    return null;
  }
}
