"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../firebase.config";
import { FaStar, FaRegStar, FaHome } from "react-icons/fa";
import Link from "next/link";

interface Feedback {
  id: string;
  name: string;
  rating: number;
  comments: string;
}

function Page() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [user, setUser] = useState<any | null>(null);

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
      const feedbacksData: Feedback[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        feedbacksData.push({ id: doc.id, ...data } as Feedback);
      });
      setFeedbacks(feedbacksData);
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
      setFeedbacks([
        ...feedbacks,
        { id: Date.now().toString(), name, rating, comments },
      ]);
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
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <div
      className="w-screen relative h-screen flex flex-col  items-center justify-center xl:flex-row xl:gap-10"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://static.vecteezy.com/system/resources/thumbnails/023/219/700/small_2x/table-with-stack-of-stylish-sweaters-and-woman-s-shoes-on-grey-background-generative-ai-photo.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link href={"/"}>
        <div className="absolute top-10 left-10">
          <FaHome size={34} color="white" />
        </div>
      </Link>
      {user && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg mt-10 shadow-md w-full max-w-sm mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Feedback Form
          </h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-gray-700 font-semibold mb-2"
            >
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {[1, 2, 3, 4, 5].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="comments"
              className="block text-gray-700 font-semibold mb-2"
            >
              Comments
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r px-16 from-blue-400 to-purple-600 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg"
          >
            Submit
          </button>
        </form>
      )}
      <div className="w-full max-w-2xl  bg-white p-6  rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
          Feedbacks
        </h3>
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id} className="mb-4">
              <div className="border-b pb-2 mb-2">
                <p className="text-lg font-semibold">{feedback.name}</p>
                <div className="flex">{renderStars(feedback.rating)}</div>
                <p className="text-gray-600">Comments: {feedback.comments}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
