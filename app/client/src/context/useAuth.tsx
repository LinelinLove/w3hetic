import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  authToken: string | null;
  user: { username: string; email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");

    if (token) {
      setAuthToken(token);
      setUser(JSON.parse(user || "{}"));
    }
    setLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const response = await fetch(`${import.meta.env.VITE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setAuthToken(data.token);
      localStorage.setItem("authToken", data.token);

      const userResponse = await fetch(
        `${import.meta.env.VITE_API}/user/${username}`,
        {
          headers: { Authorization: `Bearer ${data.token}` },
        }
      );
      const userData = await userResponse.json();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    console.error("Login failed:", response.statusText);
    return false;
  };
  const signup = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const response = await fetch(`${import.meta.env.VITE_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser({ username, email });

      const loginSuccessful = await login(username, password);
      return loginSuccessful;
    }

    console.error("Signup failed:", response.statusText);
    return false;
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        user,
        login,
        signup,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
