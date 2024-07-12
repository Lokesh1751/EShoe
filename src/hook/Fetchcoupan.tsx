"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebase.config";

const useCoupons = (user: any) => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const couponsCollection = collection(FIRESTORE_DB, "coupans");
        const querySnapshot = await getDocs(couponsCollection);
        const couponsData: any[] = [];

        querySnapshot.forEach((doc) => {
          couponsData.push({ id: doc.id, ...doc.data() });
        });

        setCoupons(couponsData);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [user]);

  return { coupons, loading };
};
export default useCoupons;
