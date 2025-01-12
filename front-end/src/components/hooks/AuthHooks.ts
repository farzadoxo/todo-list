import { useEffect, useState } from 'react';

const addNewUserLogin = (userEmail: string): string => {
  const isItemSet = (key: string) => localStorage.getItem(key) !== null;
  localStorage.setItem("userEmail", userEmail)

  if (!isItemSet("userEmail")) {
    return "failed"
  }

  return "ok"

}



const useLoggedInUser = (): string => {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const updateUserName = () => {
      const storedUserName = localStorage.getItem("userName");

      if (storedUserName) {

        setUserName(storedUserName);
      }

    };

    // Initial check for userName in localStorage
    updateUserName();

    // Set up storage event listener
    window.addEventListener('storage', updateUserName);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storage', updateUserName);
    };
  }, []);

  return userName;
};


const useLogOut = (): [() => Promise<void>, Error | null] => {
  const [error, setError] = useState<Error | null>(null);

  const logout = async (): Promise<void> => {
    try {
      localStorage.clear();
      setError(null);
      location.reload()
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred during logout.",));
      }
    }
  };

  return [logout, error];
};



export { useLoggedInUser, addNewUserLogin, useLogOut }
