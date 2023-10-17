import { useEffect, useState } from "react";
import {
  get,
  getDatabase,
  orderByKey,
  query,
  ref,
} from "firebase/database";

function useQuestions(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchQuestions() {
      //database related logics
      const db = getDatabase();
      const quizRef = ref(db, "quiz/"+ videoID+ "/questions"); //ref(name of database, node name)
      const quizQuery = query(
        quizRef,
        orderByKey(),
      );

      try {
        setError(false);
        setLoading(true);

        //request database
        const snapshot = await get(quizQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setQuestions((prevQuestions) => {
            return [...prevQuestions, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchQuestions();
  }, [videoID]);

  return {
    loading,
    error,
    questions,
  };
}

export default useQuestions;