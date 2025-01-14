import { useState } from 'react';

const addNewUserLogin = (userEmail: string): string => {
  const isItemSet = (key: string) => localStorage.getItem(key) !== null;
  localStorage.setItem("userEmail", userEmail)

  if (!isItemSet("userEmail")) {
    return "failed"
  }

  return "ok"

}





const useLoggedInUser = (): string => {

  const email = localStorage.getItem("userEmail")


  if (email) {

    return email
  } else {
    return "none"
  }


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
