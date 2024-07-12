"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../firebase.config";
import { FaStar, FaRegStar } from "react-icons/fa";
import Link from "next/link";

interface Feedback {
  id: string;
  name: string;
  rating: number;
  comments: string;
}

function FeedbackPage() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Unsubscribe when component unmounts
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const querySnapshot = await getDocs(
        collection(FIRESTORE_DB, "feedbacks")
      );
      const fetchedFeedbacks: Feedback[] = [];
      querySnapshot.forEach((doc) => {
        fetchedFeedbacks.push({ id: doc.id, ...doc.data() } as Feedback);
      });
      setFeedbacks(fetchedFeedbacks);
      setLoading(false);
    };

    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(FIRESTORE_DB, "feedbacks"), {
        name,
        rating,
        comments,
      });

      // Update state with new feedback
      setFeedbacks([
        ...feedbacks,
        { id: Date.now().toString(), name, rating, comments },
      ]);

      // Clear input fields after submission
      setName("");
      setRating(1);
      setComments("");
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} className="text-yellow-500" />
        )
      );
    }
    return stars;
  };
  if (loading) {
    return (
      <div>
        <div
          className="w-screen h-screen flex items-center justify-center mx-auto px-10 py-12"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="text-white text-3xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div
        className="max-w-full mx-auto px-10 py-12"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold text-white">Add Your Feedback</h1>
            <div className="flex flex-col text-white">
              <label htmlFor="name" className="text-lg font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-gray-300 text-black rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="rating"
                className="text-lg font-medium text-white"
              >
                Rating
              </label>
              <div className="flex items-center mt-1">
                {renderStars(rating)}
              </div>
              <input
                type="range"
                id="rating"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full mt-2 focus:outline-none  focus:ring-blue-400 to-purple-600"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="comments"
                className="text-lg font-medium text-white"
              >
                Comments
              </label>
              <textarea
                id="comments"
                placeholder="Add your review"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
                rows={4}
                className="border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-purple-600 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Submit Feedback
            </button>
          </form>
        ) : (
          <div className="text-lg font-medium text-center text-white">
            <p>Please log in to submit feedback.</p>
            <button className="textwhite hover:underline mt-2 focus:outline-none">
              <Link href={"/Login"}>Login </Link>
            </button>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white">
            Recent Feedbacks
          </h2>
          {feedbacks.length === 0 ? (
            <p className="mt-4 text-lg text-white">No feedbacks yet.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {feedbacks.map((feedback) => (
                <li key={feedback.id} className="border rounded p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-semibold text-white">
                      {feedback.name}
                    </span>
                    <div className="flex ml-2">
                      {renderStars(feedback.rating)}
                    </div>
                  </div>
                  <p className="text-white">{feedback.comments}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
