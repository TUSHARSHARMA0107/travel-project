import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    data: {
      token: string;
      user: User;
    }
  ) => void;
  logout: () => void;
}

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

// SAFE STORAGE FUNCTION
const getStoredUser = (): User | null => {

  try {

    const storedUser =
      localStorage.getItem("user");

    if (
      !storedUser ||
      storedUser === "undefined"
    ) {
      return null;
    }

    return JSON.parse(storedUser);

  } catch (error) {

    console.log(
      "Invalid localStorage user data"
    );

    return null;
  }
};

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [user, setUser] =
    useState<User | null>(
      getStoredUser()
    );

  const login = (
    data: {
      token: string;
      user: User;
    }
  ) => {

    localStorage.setItem(
      "token",
      data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);
  };

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};