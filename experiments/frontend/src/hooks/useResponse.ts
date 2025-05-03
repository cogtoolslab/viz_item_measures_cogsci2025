import { useState } from "react";

export const useResponse = () => {
  const [response, setResponse] = useState<Object>({});
  // console.log(response);

  const addResponse = (object: Object) => {
    setResponse((prevState) => {
      return {
        ...prevState,
        ...object,
      };
    });
    
    const partialJson = {
      // ...Object.values(object)[0],
      order: object,
      params: (response as any).parsed_params || {},
      timestamp: new Date().getTime()
    }
    console.log(partialJson)
    fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partialJson),
    });
    
  };

  const getResponse = () => {
    return response;
  };

  const uploadResponse = async () => {
    await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });
  };

  return { addResponse, getResponse, uploadResponse };
};
