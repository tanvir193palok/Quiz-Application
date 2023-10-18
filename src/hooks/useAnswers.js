import { useEffect, useState } from "react";
import {
  get,
  getDatabase,
  orderByKey,
  query,
  ref,
} from "firebase/database";

function useAnswers(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    async function fetchAnswers() {
      //database related logics
      const db = getDatabase();
      const answerRef = ref(db, "answers/"+ videoID+ "/questions"); //ref(name of database, node name)
      const answerQuery = query(
        answerRef,
        orderByKey(),
      );

      try {
        setError(false);
        setLoading(true);

        //request database
        const snapshot = await get(answerQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchAnswers();
  }, [videoID]);

  return {
    loading,
    error,
    answers,
  };
}

export default useAnswers;